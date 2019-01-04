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

function findMostAsleepGuard(records){
    const guardSleepTime = new Map();
    // calculating sleep time for all records
    for(let record of records){
        if(!guardSleepTime.has(record.guard)){
            guardSleepTime.set(record.guard, 0);
        }
        let minutesAsleep = record.minutes.reduce((sum, minute) => sum + minute, 0);
        guardSleepTime.set(record.guard, guardSleepTime.get(record.guard) + minutesAsleep);
    }
    let mostAsleepGuard;
    let timeAsleepGuard = 0;
    for(let guard of guardSleepTime.keys()){
        if(guardSleepTime.get(guard) > timeAsleepGuard){
            mostAsleepGuard = guard;
            timeAsleepGuard = guardSleepTime.get(guard);
        }
    }
    return mostAsleepGuard;
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

function solve(){
    const myInput = require("fs").readFileSync("src/04/input.txt").toString();
    const records = parseRecords(myInput);

    const part1Guard = findMostAsleepGuard(records);
    const part1Minute = findMostAsleepMinute(records, part1Guard).minute;

    return part1Guard * part1Minute;
}

module.exports = {
    parseRecords,
    findMostAsleepGuard,
    findMostAsleepMinute,
    solve,
    title: "--- Day 4: Repose Record ---"
};