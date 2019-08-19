var Pool = require('pg-pool')
var Promise = require('promise');
var logger = require('../logger');

var pool = new Pool({
	host: 'baasu.db.elephantsql.com',
	database: 'qbyovcvu',
	user: 'qbyovcvu',
	password: 'H6x2eyjtYTbgMOLSpK405aBVy07lO1B1',
	port: 5432,
	ssl: true,
	max: 150,
	idleTimeoutMillis: 999999,
	connectionTimeoutMillis: 999999
});


module.exports = {

    UserFunctions: {

        getUser: function(id, password) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select id, user_type, first_name, last_name from snailcare.person where id = '${id}' and password = '${password}' and is_active = '1' limit 1`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		isExists: function(id) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select count(1) as num_of_users from snailcare.person where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {	
						client.release();
						logger.info(res.rows[0])
						resolve(res.rows[0]);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		addClient: function(id, firstName, lastName, address, phoneNumber, email, hash) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `INSERT INTO snailcare.person (id, first_name, last_name, address, phone_number, is_active, user_type, email, password) VALUES ('${id}', '${firstName}', '${lastName}', '${address}', '${phoneNumber}', '1', 1, '${email}', '${hash}')`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		removeClient: function(id) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `update snailcare.person set is_active = '0' where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		getClients: function() {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select * from snailcare.person where user_type = 1 and is_active = '1'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		getDeletedClients: function() {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select * from snailcare.person where user_type = 1 and is_active <> '1'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		updateClient: function(id, firstName, lastName, address, phoneNumber, email) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `update snailcare.person set first_name = '${firstName}', last_name = '${lastName}', address = '${address}', phone_number = '${phoneNumber}', email = '${email}' where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		setIsActiveClient: function(id) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `update snailcare.person set is_active = '1' where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		physicalRemoveClient: function(id) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `delete from snailcare.person where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        }
		
    },
	
	AppointmentsFunctions: {

        getAppointments: function(id, password) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `
		select 
			queue.staff_id, queue.date, queue.hour, queue_status.name as status, queue.id, 
			staff.personal_information as doctor, branch.name as branch, profession.name as profession,
			to_char(to_timestamp(queue.date || '_' || queue.hour, 'YYYYMMDD_hh'), 'YYYY-MM-DD hh:00:00') as "fullDate"
		from snailcare.queue queue 
			join snailcare.queue_status queue_status on queue.status = queue_status.code		 
					join snailcare.staff staff on queue.staff_id = staff.id
						join snailcare.branch branch on staff.branch = branch.code
							join snailcare.profession profession on staff.profession = profession.code
		where queue.id is not null`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		isExists: function(staffId, date, hour, id) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select count(1) as result from snailcare.queue where staff_id = '${staffId}' and date = ${date} and hour = ${hour} and id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {	
						client.release();
						logger.info(res.rows[0])
						resolve(res.rows[0]);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		removeAppointment: function(staffId, date, hour, id) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `update snailcare.queue set id = null where staff_id = '${staffId}' and date = ${date} and hour = ${hour} and id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {	
						client.release();
						logger.info(res.rows[0])
						resolve(res.rows[0]);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        }
		
    },
	
	StaffsFunctions: {

        getProfessions: function() {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select * from snailcare.profession`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		addGeneralStaff: function(id, firstName, lastName, address, phoneNumber, email, hash) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `INSERT INTO snailcare.person (id, first_name, last_name, address, phone_number, is_active, user_type, email, password) VALUES ('${id}', '${firstName}', '${lastName}', '${address}', '${phoneNumber}', '1', 3, '${email}', '${hash}')`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		addStaff: function(id, personalInfo, branch, profession) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `INSERT INTO snailcare.staff (id, personal_information, branch, profession) VALUES ('${id}', '${personalInfo}', ${branch}, ${profession})`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		getStaffs: function() {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select s.id, p.first_name as "firstName", p.last_name as "lastName", p.phone_number as "phoneNumber", p.email, s.profession as "professionCode",pro.name as "professionName" ,s.branch as "branchCode", b.name as "branchName", s.personal_information as "personalInformation" from ((snailcare.staff s join snailcare.branch b on (s.branch = b.code)) join snailcare.profession pro on (s.profession = pro.code)) join snailcare.person p on (p.id = s.id) where p.user_type = 3 and is_active = '1'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		updateGeneralStaff: function(id, firstName, lastName, phoneNumber) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `update snailcare.person set first_name = '${firstName}', last_name = '${lastName}', phone_number = '${phoneNumber}' where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		updateStaff: function(id, personalInformation, branchCode, professionCode) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `update snailcare.staff set personal_information = '${personalInformation}', branch = ${branchCode}, profession = ${professionCode} where id = '${id}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        }
		
    },
	
	BranchesFunctions: {

        isExists: function(branchName) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select count(1) as num_of_branches from snailcare.branch where name = '${branchName}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {	
						client.release();
						logger.info(res.rows[0])
						resolve(res.rows[0]);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		getBranches: function() {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select b.code, b.name as "branchName", b.area_code as "areaCode", a.name as "areaCodeName" from snailcare.branch b join snailcare.area a on b.area_code = a.code`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		addBranch: function(branchName, areaCode) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `INSERT INTO snailcare.branch (name, area_code) VALUES ('${branchName}', ${areaCode})`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        },
		
		updateBranch: function(branchName, areaCode, oldBranchName) {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `UPDATE snailcare.branch SET name = '${branchName}', area_code = ${areaCode} where name = '${oldBranchName}'`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release();
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        }
		
    },
	
	
	AreaFunctions: {

        getAreas: function() {
           
            return new Promise(function(resolve, reject) {				
				pool.connect().then(client => {	
					query = `select * from snailcare.area`;
					logger.info(`running: ${query}`);
					client.query(query).then(res => {								
						client.release()
						resolve(res.rows);
					})
					.catch(e => {						
						client.release();						
						reject(e);
					})					
				})
            });
			
        }
		
    }
	
};