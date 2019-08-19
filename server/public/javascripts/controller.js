(function (app) {

  app.controller('MainCtrl', ['$rootScope', '$scope', '$window', '$location', '$routeParams', '$route', 'Factory', '$interval', '$timeout', '$document',
    function ($rootScope, $scope, $window, $location, $routeParams, $route, Factory, $interval, $timeout, $document) {

      var mCtrl = this;

      if (!$rootScope.user) {
        $rootScope.userName = '';
        $rootScope.userId = -1;
        $rootScope.user = {};
        $rootScope.loginData = {};
      }
	  
	  mCtrl.restEditMode = function () {mCtrl.editMode = false;}
	  
      mCtrl.doLogin = function () {
        var userId = $rootScope.loginData.userId;
        var password = $rootScope.loginData.password;
        if (userId && password && userId.length > 0 && password.length > 0) {
          Factory.loginUser(userId, password)
            .success(function (data) {
              if (data.status && data.is_exists) {
                if (data.user_type !== 2) {
                  $rootScope.loginData.errMsg = "You don't have permission to enter the admin panel";
                  $rootScope.user = {};
                  $rootScope.userId = -1;
                  $rootScope.userName = '';
                }
                else {
                  $rootScope.userId = data.id;
                  $rootScope.user = data.name;
                  $rootScope.userName = data.name;
                  $location.path('/home');
                  localStorage.userId = $rootScope.userId;
                }
              }
              else {
                $rootScope.loginData.errMsg = "Incorrect Username or Password";
              }
            })
            .error(function (e) {
              console.log(e);
              $rootScope.loginData.errMsg = "Error Logging In";
            });
        }
        else {
          $rootScope.loginData.errMsg = "Please fill in these required fields";
        }
      };

      mCtrl.initAreas = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          var data = $route.current.locals.initData;
          if (data.status) {
            mCtrl.areas = $route.current.locals.initData.data;			
          }
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };

	  mCtrl.initBranchList = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          var data = $route.current.locals.initData;
          if (data.status) {			  
            mCtrl.branchList = $route.current.locals.initData.data;			
			Factory.getAreas().success(function (data) {
			  mCtrl.areas = (data.status) ? data.data : [];			
            });
          }
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };
	  
	  mCtrl.initAddStaff = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          Factory.getBranches().success(function (data) {
			  mCtrl.branches = (data.status) ? data.data : [];				
			  Factory.getProfessions().success(function (data) {
				  mCtrl.professions = (data.status) ? data.data : [];				
			  });
		  });
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };
	  
	  mCtrl.initClients = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          Factory.getClients().success(function (data) {
			  mCtrl.clients = (data.status) ? data.data : [];
		  });
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };
	  
	  mCtrl.initAppointments = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          Factory.getAppointments().success(function (data) {
			  mCtrl.appointments = (data.status) ? data.data : [];
		  });
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };
	  
	  mCtrl.initStaffs = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          Factory.getStaffs().success(function (data) {
			  mCtrl.staffs = (data.status) ? data.data : [];
			  Factory.getBranches().success(function (data) {
				  mCtrl.branches = (data.status) ? data.data : [];				
				  Factory.getProfessions().success(function (data) {
					  mCtrl.professions = (data.status) ? data.data : [];				
				  });
			  });
		  });
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };
	  
	  mCtrl.initDeletedClients = function () {
        $rootScope.layout.loading = true;
		mCtrl.restEditMode();
        try {
          Factory.getDeletedClients().success(function (data) {
			  mCtrl.clients = (data.status) ? data.data : [];			
		  });
        }
        catch (e) {
          console.log(e);
        }
        $rootScope.layout.loading = false;
      };	  
	  
	  mCtrl.addBranch = function () {
        var formData = $rootScope.formData;
        if (formData && formData.branchName && formData.areaCode) {
          Factory.addBranch(formData)
            .success(function (data) {				
              if (data.status) {
				if (data.data && data.data.error && data.data.error === "already_exists") {
					$rootScope.formData.successMsg = null;
					$rootScope.formData.errMsg = "Branch already exists";
				} else {
					$rootScope.formData.errMsg = null;
					$rootScope.formData = {};
					$rootScope.formData.successMsg = "Successfully Added";
				}
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error adding new user";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error adding new branch";
              console.log(e);
            })
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
      };
	  
	  mCtrl.updateBranch = function () {
        var branch = mCtrl.branchList[mCtrl.currentUserIndex];
        if (branch && branch.newBranchName && branch.newBranchName.length > 0 && branch.newAreaCode) {
          Factory.updateBranch(branch)
            .success(function (data) {
              if (data.status) {				  
				if (data.data && data.data.error && data.data.error === "already_exists") {
					$rootScope.formData.successMsg = null;
					$rootScope.formData.errMsg = "Branch already exists";
				} else {
					$rootScope.formData.errMsg = null;
					$rootScope.formData = {};
					$rootScope.formData.successMsg = "Changed Successfully";
					try {
						branch.branchName = branch.newBranchName;
						branch.areaCode = branch.newAreaCode;
						for (var i = 0; i < mCtrl.areas.length; i++) {
							if (mCtrl.areas[i].code == branch.newAreaCode) {
								branch.areaCodeName = mCtrl.areas[i].name;
								break;
							}
						}
					branch.newBranchName = '';	
					branch.newAreaCode = '';						
					}
					catch (e) {
					}
				}
                
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error editing branch";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error editing branch";
              console.log(e);
            });
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
        mCtrl.closeBlocker();
      };
	  
	  mCtrl.addClient = function () {
        var formData = $rootScope.formData;
        if (formData && formData.id && formData.firstName && formData.lastName && formData.address &&
				formData.phoneNumber && formData.email && formData.password) {
          Factory.addClient(formData)
            .success(function (data) {				
              if (data.status) {
				if (data.data && data.data.error && data.data.error === "already_exists") {
					$rootScope.formData.successMsg = null;
					$rootScope.formData.errMsg = "Client already exists";
				} else {
					$rootScope.formData.errMsg = null;
					$rootScope.formData = {};
					$rootScope.formData.successMsg = "Successfully Added";
				}
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error adding new client";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error adding new client";
              console.log(e);
            })
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
      };
	  
	  mCtrl.addStaff = function () {
        var formData = $rootScope.formData;
        if (formData && formData.id && formData.firstName && formData.lastName && formData.address &&
				formData.phoneNumber && formData.email && formData.password && formData.personalInfo && 
					formData.branch && formData.profession) {
          Factory.addStaff(formData)
            .success(function (data) {				
              if (data.status) {
				if (data.data && data.data.error && data.data.error === "already_exists") {
					$rootScope.formData.successMsg = null;
					$rootScope.formData.errMsg = "Staff already exists";
				} else {
					$rootScope.formData.errMsg = null;
					$rootScope.formData = {};
					$rootScope.formData.successMsg = "Successfully Added";
				}
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error adding new staff";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error adding new staff";
              console.log(e);
            })
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
      };	  
	  
	  mCtrl.removeClient = function (index) {
        Factory.removeClient(mCtrl.clients[index].id)
          .success(function (data) {
            if (data.status) {
              $rootScope.formData.errMsg = null;
              $rootScope.formData = {};
              $rootScope.formData.successMsg = "Successfully Removed";
              try {
                mCtrl.clients.splice(index, 1);
              }
              catch (e) {
              }
            }
            else {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error removing client";
            }
          })
          .error(function (e) {
            $rootScope.formData.successMsg = null;
            $rootScope.formData.errMsg = "Error removing client";
            console.log(e);
          });
      };
	  
	  mCtrl.removeAppointment = function (index) {		
		var staffId = mCtrl.appointments[index].staff_id;
		var date = mCtrl.appointments[index].date;
		var hour = mCtrl.appointments[index].hour;
		var id = mCtrl.appointments[index].id;
        Factory.removeAppointment(staffId, date, hour, id)
          .success(function (data) {
            if (data.status) {
              $rootScope.formData.errMsg = null;
              $rootScope.formData = {};
              $rootScope.formData.successMsg = "Successfully Removed";
              try {
                mCtrl.appointments.splice(index, 1);
              }
              catch (e) {
              }
            }
            else {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error removing appointment";
            }
          })
          .error(function (e) {
            $rootScope.formData.successMsg = null;
            $rootScope.formData.errMsg = "Error removing appointment";
            console.log(e);
          });
      };
	  
	  mCtrl.removeStaff = function (index) {
        Factory.removeClient(mCtrl.staffs[index].id)
          .success(function (data) {
            if (data.status) {
              $rootScope.formData.errMsg = null;
              $rootScope.formData = {};
              $rootScope.formData.successMsg = "Successfully Removed";
              try {
                mCtrl.staffs.splice(index, 1);
              }
              catch (e) {
              }
            }
            else {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error removing staff";
            }
          })
          .error(function (e) {
            $rootScope.formData.successMsg = null;
            $rootScope.formData.errMsg = "Error removing staff";
            console.log(e);
          });
      };
	  
	  mCtrl.updateClient = function () {
        var client = mCtrl.clients[mCtrl.currentUserIndex];
        if (client && client.newFirstName && client.newLastName && client.newPhoneNumber
				&& client.newAddress && client.newEmail) {
          Factory.updateClient(client)
            .success(function (data) {
              if (data.status) {				  
				$rootScope.formData.errMsg = null;
					$rootScope.formData = {};
					$rootScope.formData.successMsg = "Changed Successfully";
					try {
					client.first_name = client.newFirstName;
					client.last_name = client.newLastName;
					client.phone_number = client.newPhoneNumber;		
					client.address = client.newAddress;
					client.email = client.newEmail;
									
					client.newFirstName = '';	
					client.newLastName = '';	
					client.newPhoneNumber = '';		
					client.newAddress = '';	
					client.newEmail = '';				
					}
					catch (e) {
					}                
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error editing client";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error editing client";
              console.log(e);
            });
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
        mCtrl.closeBlocker();
      };
	  
	  mCtrl.setIsActiveClient = function () {
		var last_index = mCtrl.currentUserIndex;
        var client = mCtrl.clients[mCtrl.currentUserIndex];
        if (client && client.newIsActive) {
          Factory.setIsActiveClient(client)
            .success(function (data) {
              if (data.status) {				  
				$rootScope.formData.errMsg = null;
				$rootScope.formData = {};
				$rootScope.formData.successMsg = "Successfully Changed";
				try {
					mCtrl.clients.splice(last_index, 1);
				}
				catch (e) {
				}           
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error editing client";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error editing client";
              console.log(e);
            });
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
        mCtrl.closeBlocker();
      };
	  
	  mCtrl.updateStaff = function () {
        var staff = mCtrl.staffs[mCtrl.currentUserIndex];
        if (staff && staff.newFirstName && staff.newLastName && staff.newPhoneNumber
				&& staff.newPersonalInformation && staff.newBranchCode && staff.newProfessionCode) {
          Factory.updateStaff(staff)
            .success(function (data) {
              if (data.status) {				  
				$rootScope.formData.errMsg = null;
					$rootScope.formData = {};
					$rootScope.formData.successMsg = "Changed Successfully";
					try {
					staff.firstName = staff.newFirstName;
					staff.lastName = staff.newLastName;
					staff.phoneNumber = staff.newPhoneNumber;		
					staff.personalInformation = staff.newPersonalInformation;
				
					for (var i = 0; i < mCtrl.branches.length; i++) {
						if (mCtrl.branches[i].code == staff.newBranchCode) {
							staff.branchName = mCtrl.branches[i].branchName;
							break;
						}
					}
					
					for (var i = 0; i < mCtrl.professions.length; i++) {
						if (mCtrl.professions[i].code == staff.newProfessionCode) {
							staff.professionName = mCtrl.professions[i].name;
							break;
						}
					}
						
									
					staff.newFirstName = '';	
					staff.newLastName = '';						
					staff.newPhoneNumber = '';	
					staff.newPersonalInformation= '';	
					staff.newBranchCode	= '';
					staff.newProfessionCode	= '';						
					}
					catch (e) {
					}                
              }
              else {
                $rootScope.formData.successMsg = null;
                $rootScope.formData.errMsg = "Error editing client";
              }
            })
            .error(function (e) {
              $rootScope.formData.successMsg = null;
              $rootScope.formData.errMsg = "Error editing client";
              console.log(e);
            });
        }
        else {
          $rootScope.formData.successMsg = null;
          $rootScope.formData.errMsg = "Please fill all necessary fields";
        }
        mCtrl.closeBlocker();
      };
	  
	  mCtrl.fillStaffUpdateFileds = function (index) {
        mCtrl.staffs[index].newFirstName =  mCtrl.staffs[index].firstName;
		mCtrl.staffs[index].newLastName =  mCtrl.staffs[index].lastName;
		mCtrl.staffs[index].newPhoneNumber =  mCtrl.staffs[index].phoneNumber;
		mCtrl.staffs[index].newPersonalInformation =  mCtrl.staffs[index].personalInformation;
      };
	  
	  mCtrl.fillClientUpdateFileds = function (index) {
        mCtrl.clients[index].newFirstName =  mCtrl.clients[index].first_name;
		mCtrl.clients[index].newLastName =  mCtrl.clients[index].last_name;
		mCtrl.clients[index].newPhoneNumber =  mCtrl.clients[index].phone_number;
		mCtrl.clients[index].newAddress =  mCtrl.clients[index].address;
		mCtrl.clients[index].newEmail =  mCtrl.clients[index].email;
      };
	  
	  mCtrl.fillBranchUpdateFileds = function (index) {
        mCtrl.branchList[index].newBranchName =  mCtrl.branchList[index].branchName;	
      };
	  
      mCtrl.popBlocker = function (index) {
        mCtrl.editMode = true;
        mCtrl.currentUserIndex = index;
      };

      mCtrl.closeBlocker = function () {
        mCtrl.editMode = false;
        mCtrl.currentUserIndex = -1;
      };

      $document.ready(function () {
        //document ready functions
      });
    }
  ]);

  app.controller('HeaderCtrl', ['$rootScope', 'Factory',
    function ($rootScope, Factory) {
      $rootScope.menuOpen = false;
      var hCtrl = this;
      hCtrl.sideMenuToggle = function () {
        if ($('#sideBar').hasClass('toggled')) {
          $('#sideBar').removeClass('toggled');
          $('#mainTemplate .container').css('margin-left', 'auto');
          $rootScope.menuOpen = false;
        } else {
          $('#sideBar').addClass('toggled');
          $('#mainTemplate .container').css('margin-left', '300px');
          $rootScope.menuOpen = true;
        }
      };
	  
      hCtrl.toggleDrop = function (event) {
        var el = event.target;
        if (el.tagName == 'I') {
          el = $(el).parent().parent();
		}
        var dropMenu = $(el).parent().find('ul');
        $(dropMenu).toggleClass('hide');
      };

      hCtrl.collapseMenu = function () {
        $('.menu-trigger').removeClass('open');
        $('.sub-menu').each(function () {
          $(this).removeClass('active');
          $(this).find('ul').addClass('hide');
        })
      };

      hCtrl.logout = function () {
        $rootScope.userId = -1;
        $rootScope.user = {};
        $rootScope.loginData = {};
        localStorage.removeItem('userId');
		Factory.logout();
      };
    }])
})(app || {});