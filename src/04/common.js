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

module.exports = {
    parseRecords
};