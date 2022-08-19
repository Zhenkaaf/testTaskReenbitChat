

const GetDate = {
    monthDayYearSlice() {
        let date = new Date();
        let month = date.getMonth() + 1;
        let day = date.getDate();
        let year = date.getFullYear();
        let strYear = year.toString();
        let lastTwoNumbersOfYear = strYear.slice(-2);
        return `${month}/${day}/${lastTwoNumbersOfYear}`;
    },
    hoursMinutesAmPm() {
        let date = new Date();
        let hours = date.getHours();
        let minutes = date.getMinutes();
        let ampm = hours >= 12 ? 'PM' : 'AM';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes.toString().padStart(2, '0');
        let strTime = hours + ':' + minutes + ' ' + ampm;
        return strTime;
    },
}
export default GetDate;