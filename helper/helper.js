const moment = require('moment');
const momentTimezone = require('moment-timezone');

class Helper{
    /**
     * 
     * @param { Date } str1 
     * @param { Date } str2 
     */
    static CompareTwoDate(str1, str2){
        let date1 = moment(new Date(str1)).format('DD/MM/yyyy');
        let date2 = moment(new Date(str2)).format('DD/MM/YYYY');
        return date1.localeCompare(date2);
    }

    /**
     * 
     * @param { Date } data 
     */
    static convertFullHour(data) {
        let hour = new Date(data).getHours();
        let minute = new Date(data).getMinutes();
    
        return {
            hours: hour,
            minutes: minute
        };
    }

}

module.exports = Helper;