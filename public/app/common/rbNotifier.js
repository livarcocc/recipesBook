'use strict';

angular.module(ApplicationConfiguration.applicationModuleName).value('rbToastr', toastr);

angular.module(ApplicationConfiguration.applicationModuleName).factory('rbNotifier', function (rbToastr) {
  return {
    success: function (msg) {
      rbToastr.success(msg);
      console.log(msg);
    },
    error: function (msg) {
      rbToastr.error(msg);
      console.log(msg);
    }
  };
});