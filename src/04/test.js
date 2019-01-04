const expect = require("chai").expect;

const part1 = require("./part1");
const part2 = require("./part2");

const {parseRecords} = require("./common");
const {findMostAsleepGuard, findMostAsleepMinute} = part1;
const {findGuardMostAsleepOnSameMinute} = part2;

describe(part1.title, () => {

    let recordsText =
        `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-01 00:25] wakes up
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-02 00:40] falls asleep
[1518-11-02 00:50] wakes up
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-03 00:24] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:45] falls asleep
[1518-11-05 00:55] wakes up`;

    describe("--- Part One ---", () => {

        it("should parse the records to find the guards", ()=>{
            const record = parseRecords(recordsText);
            const recordDayOne = record[0];
            const recordDayTwo = record[1];
            const recordDayThree = record[2];
            const recordDayFour = record[3];
            const recordDayFive = record[4];
            expect(recordDayOne.guard).to.equal(10);
            expect(recordDayTwo.guard).to.equal(99);
            expect(recordDayThree.guard).to.equal(10);
            expect(recordDayFour.guard).to.equal(99);
            expect(recordDayFive.guard).to.equal(99);
        });

        it("should parse the records to log the sleepy minutes", ()=>{
            const record = parseRecords(recordsText);
            const recordDayOne = record[0];
            const recordDayTwo = record[1];

            expect(recordDayOne.minutes[0]).to.equal(false);
            expect(recordDayOne.minutes[5]).to.equal(true);
            expect(recordDayOne.minutes[24]).to.equal(true);
            expect(recordDayOne.minutes[25]).to.equal(false);
            expect(recordDayOne.minutes[29]).to.equal(false);
            expect(recordDayOne.minutes[30]).to.equal(true);
            expect(recordDayOne.minutes[54]).to.equal(true);
            expect(recordDayOne.minutes[55]).to.equal(false);

            expect(recordDayTwo.minutes[0]).to.equal(false);
            expect(recordDayTwo.minutes[39]).to.equal(false);
            expect(recordDayTwo.minutes[40]).to.equal(true);
            expect(recordDayTwo.minutes[49]).to.equal(true);
            expect(recordDayTwo.minutes[50]).to.equal(false);
        });

        it("should sort the records before parsing it", () => {

            let unsortedRecordsText =
                `[1518-11-01 00:00] Guard #10 begins shift
[1518-11-03 00:05] Guard #10 begins shift
[1518-11-01 00:30] falls asleep
[1518-11-01 00:55] wakes up
[1518-11-01 23:58] Guard #99 begins shift
[1518-11-01 00:05] falls asleep
[1518-11-02 00:40] falls asleep
[1518-11-03 00:24] falls asleep
[1518-11-04 00:02] Guard #99 begins shift
[1518-11-02 00:50] wakes up
[1518-11-01 00:25] wakes up
[1518-11-05 00:45] falls asleep
[1518-11-03 00:29] wakes up
[1518-11-04 00:36] falls asleep
[1518-11-04 00:46] wakes up
[1518-11-05 00:03] Guard #99 begins shift
[1518-11-05 00:55] wakes up`;
            const record = parseRecords(unsortedRecordsText);
            const recordDayOne = record[0];
            const recordDayTwo = record[1];

            expect(recordDayOne.minutes[0]).to.equal(false);
            expect(recordDayOne.minutes[5]).to.equal(true);
            expect(recordDayOne.minutes[24]).to.equal(true);
            expect(recordDayOne.minutes[25]).to.equal(false);
            expect(recordDayOne.minutes[29]).to.equal(false);
            expect(recordDayOne.minutes[30]).to.equal(true);
            expect(recordDayOne.minutes[54]).to.equal(true);
            expect(recordDayOne.minutes[55]).to.equal(false);

            expect(recordDayTwo.minutes[0]).to.equal(false);
            expect(recordDayTwo.minutes[39]).to.equal(false);
            expect(recordDayTwo.minutes[40]).to.equal(true);
            expect(recordDayTwo.minutes[49]).to.equal(true);
            expect(recordDayTwo.minutes[50]).to.equal(false);
        });

        it("should find the guard which is most asleep", () => {
           const record = parseRecords(recordsText);
           const result = findMostAsleepGuard(record);
           expect(result).to.equal(10);
        });

        it("should find that guard #10 is most asleep during minute 24", () => {
            const record = parseRecords(recordsText);
            const guard= findMostAsleepGuard(record);
            const {minute} = findMostAsleepMinute(record, guard);
            expect(minute).to.equal(24);
        });

    });

    describe("--- Part Two ---", () => {

        it("should find that guard #99 is most frequently asleep on minute 45", () => {
            const record = parseRecords(recordsText);
            const {guard, minute} = findGuardMostAsleepOnSameMinute(record);
            expect(guard).to.equal(99);
            expect(minute).to.equal(45);
        });

    });

});