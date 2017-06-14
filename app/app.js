(function () {
    var todoApp = angular.module('todoApp', ['ui.router']);

    todoApp.config(function ($stateProvider, $urlRouterProvider) {

        $urlRouterProvider.otherwise('/dashboard');

        $stateProvider

            // HOME STATES AND NESTED VIEWS ========================================
            .state('dashboard', {
                url: '/dashboard',
                templateUrl: 'app/views/dashboard.html',
                controller: dashboardController
            })

            // ABOUT PAGE AND MULTIPLE NAMED VIEWS =================================
            .state('project', {
                url: '/project/:ProjectID',
                templateUrl: 'app/views/project.html',
                controller: projectController
            });

    });

    // Project details objects stored here
    var projects = [
        {
            "ProjectID": 1,
            "ProjectName": "Email Analytics",
            "Description" : "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
            "Status" : false
        },
        { 
            "ProjectID": 2,
            "ProjectName": "Instalment Billing",
            "Description" : "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet.",
            "Status" : false
        },
        { 
            "ProjectID": 3,
            "ProjectName": "Premium Adjudication",
            "Description" : "Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.",
            "Status" : false
        }
    ];

    // Find project from project id
    var findProject = function(projectID) {
        for(var i = 0; i < projects.length; i++) {
            if(projects[i].ProjectID == projectID) {
                return projects[i];
            }
        }
        return null;
    }

    // Add a new project
    var addProject = function(newProject) {
        // Find out maximum project id 
        var maxID = 0;
        for(var i = 0; i < projects.length; i++) {
            if(projects[i].ProjectID > maxID) {
                maxID = projects[i].ProjectID;
            }
        }

        // Generate new Project ID
        var newProjectID = maxID + 1;

        newProject.ProjectID = newProjectID;
        newProject.Status = false;

        projects.push(newProject);
    }

    // Dashboard Controller
    var dashboardController = function($scope) {
        $scope.projects = projects;

        $scope.add = function() {
            var newProject = {
                ProjectName: $scope.projectName,
                Description: $scope.projectDesc
            };
            addProject(newProject);
            $scope.projectName = '';
            $scope.projectDesc = '';
        }

        $scope.changeStatus = function(projectID) {
            console.log(projects);
        }

        $scope.deleteProjects = function() {
            while(true) {

                var deleteCounter = 0;

                for(var i = 0; i < projects.length; i++) {
                    if(projects[i].Status === true) {
                        projects.splice(i, 1);
                        deleteCounter++;
                        break;
                    }
                }

                if(deleteCounter == 0) {
                    break;
                }
            }
        }
    }

    // Project Controller
    var projectController = function($scope, $stateParams) {
        $scope.Project = findProject($stateParams.ProjectID);
        //$scope.ProjectID = $stateParams.ProjectID;
    }

})();