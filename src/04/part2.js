const guardShiftRegex = /\[\d{4}-\d{2}-\d{2} \d{2}:\d{2}\] Guard #(\d*) begins shift/;
const guardSleepRegex = /\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\] falls asleep/;
const guardWakingUpRegex = /\[\d{4}-\d{2}-\d{2} \d{2}:(\d{2})\] wakes up/;

function parseRecords(recordsText){
    const recordsLines = recordsText.split("\n").sort();

    let records = [];

    let currentRecord;
    let currentSleepTime;

    recordsLines.forEach( recordLine => {
        if(guardShiftRegex.test(recordLine)){
            let [_, guard] = guardShiftRegex.exec(recordLine);
            let minutes = new Array(60).fill(false);
            currentRecord = {
                guard: parseInt(guard),
                minutes
            };
            records.push(currentRecord);
            return;
        }
        if(guardSleepRegex.test(recordLine)){
            let [_, minute] = guardSleepRegex.exec(recordLine);
            currentSleepTime = minute;
            return;
        }
        if(guardWakingUpRegex.test(recordLine)){
            let [_, minute] = guardWakingUpRegex.exec(recordLine);
            currentRecord.minutes.fill(true, currentSleepTime, minute);
        }

    });

    return records;
}

function findMostAsleepMinute(records, guard){
    const guardRecordsMinutes = records.filter(record => record.guard === guard).map(record => record.minutes);
    let cumulatedMinutes = new Array(60).fill(0);
    guardRecordsMinutes.forEach(minutes => {
        for(let i = 0; i < 60; i++){
            if(minutes[i]){
                cumulatedMinutes[i]++;
            }
        }
    });
    let maxMinute = 0;
    let timeAsleepAtMinute = 0;
    cumulatedMinutes.forEach((value, index)=>{
        if(value > timeAsleepAtMinute){
            maxMinute = index;
            timeAsleepAtMinute = value;
        }
    });
    return {minute: maxMinute, timeAsleep: timeAsleepAtMinute};
}

function findGuardMostAsleepOnSameMinute(records){
    // list all guards
    const guards = records.reduce((set, record) => set.add(record.guard), new Set());
    let guard;
    let guardMinute;
    let guardTimeAsleep = 0;
    guards.forEach(currentGuard => {
       const {minute, timeAsleep} = findMostAsleepMinute(records, currentGuard);
       if(timeAsleep > guardTimeAsleep){
           guard = currentGuard;
           guardMinute = minute;
           guardTimeAsleep = timeAsleep;
       }
    });
    return {guard, minute: guardMinute};
}

function solve(){
    const myInput = require("fs").readFileSync("src/04/input.txt").toString();
    const records = parseRecords(myInput);

    const {guard: part2Guard, minute: part2Minute} = findGuardMostAsleepOnSameMinute(records);

    return part2Guard * part2Minute;
}

module.exports = {
    parseRecords,
    findGuardMostAsleepOnSameMinute,
    solve
};