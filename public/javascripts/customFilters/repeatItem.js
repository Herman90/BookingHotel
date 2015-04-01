angular.module('BookHotelApp').filter('repeat', function(){
    return function(value, count){
        if(typeof count === "number"){
            return Array(count + 1).join(value);
        }
        return value;
    }
});
