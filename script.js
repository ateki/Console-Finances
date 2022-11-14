/*
 * --------------------------------------------------------------------------------------
 * Performs basic financial analysis on data provided.
 * Data should already have been loaded into 'finances' array
 * in the format: finances[date, Profit/Loss]
 * 
 * Calling the 'main' function will 
 *  - verify data loaded,
 *  - perform analysis
 *  - output analysis report to console
 *
 * --------------------------------------------------------------------------------------
 */

/* CONSTANT VARS */

/* 
 * Index Position of data in financials array as well as other arrays 
 */
const DATE_IDX = 0;
const PROFIT_LOSS_IDX = 1;

// REPORT constants
const CURR_SYMBOL = '$';

// const log = console.log;



/* GLOBAL VARS */

/*
 *  Variables used to record info from financial analysis
 */

var total = 0;                      // total profits
var averageChange = 0;              // avg change of profit/loss each mnth
var averageChange2Dp = 0;           // Average change of profit/loss each month - to 2 decimal places

var totalMonths = 0;                // ... of financial data analysing

var largestProfitIncr = [null, 0];   // Greatest Profit Increase between months: [month, ProfitIncrease]
var largestProfitDecr = [null, 0];   // Greatest Profit Decrease between months: [month, ProfitDecrease]



/*  LIBRARY FUNCTIONS */


/*
 *   Ensure data has been loaded at this point.
 *   Verifies data:
 *       - not null/undefined
 *       - presented in 2 d array
 *   Throws Error if not, otherwise returns.
 */
function verifyData() {
    
    if (typeof finances === 'undefined') {
        console.error('Finances data has not been loaded.  <Finances is undefined>');
        throw new Error("Finances is undefined");

    } else if (finances == null) {
        console.error("Finances data has not been loaded. <Finances is null>");
        throw new Error("Finances data has not been loaded. <Finances is null>");

    } else if (!Array.isArray(finances) || finances.length==0) {
        console.error("Finacial data has not been loaded.");
        throw new Error("Finacial data has not been loaded.");

        // continue to do analysis ...
    } else  {
        console.log("Finacial data has been loaded.");
        // continue to do analysis ...

        // TODO: Remove above console and  put analysis here...
    }
}




/*
 * TODO:  Check clean data before analysis
 */




/* * 
 *  - parses data twice:
 *      - first parse to capture */


/*
 *  Performs 2 parse of analysis: 
*   First parse to record: 
*       -net total amount of profit/loss over entire period
*       -details of highest increase in profits (date and amount) over entire period
*       -details of highest decrease in profits (date and amount) over entire period
*  Second to record:
*       -averageChange ProfitLoss each month
*
*   For now assumes only one record will be highest increase/decrease over the period
*
*   TODO: What if multiple dates hit the highest increase/decrease?
*   TODO: Look for any Array function that iteratively applies function to.
*        
*/
function performAnalysis() {

    totalMonths = finances.length;   // ... of financial data

    // First parse of data - record totaProfitLoss,find largest Profit Increase/Decrease 
    for (var i=0; i<finances.length; i++) {
    
        currDate = finances[i][DATE_IDX];
        currProfitLoss = finances[i][PROFIT_LOSS_IDX];

        total += currProfitLoss;
    
        //console.log(`Date ${currDate} Profit/Loss ${currProfitLoss}`);
        //console.log(`total ${total}`);
  
        
        if (currProfitLoss > 0 &&
            currProfitLoss > largestProfitIncr[PROFIT_LOSS_IDX] ) {
            // highest increase in profits
            largestProfitIncr[PROFIT_LOSS_IDX]  = currProfitLoss;
            largestProfitIncr[DATE_IDX] = currDate;
    
        } else if (currProfitLoss < 0 &&
            currProfitLoss < largestProfitDecr[PROFIT_LOSS_IDX] ) {
           // highest decrease in profits
           largestProfitDecr[PROFIT_LOSS_IDX]  = currProfitLoss;
           largestProfitDecr[DATE_IDX] = currDate;

        }  else if (currProfitLoss == largestProfitIncr[PROFIT_LOSS_IDX] ||
            currProfitLoss == largestProfitDecr[PROFIT_LOSS_IDX] ) {
            console.log("Dupe greatest profit increase/decrease found.  Still to deal with.");
        }
    }

    // Second Parse
    calcAverageProfLossChange();
}


/*
 * Calc average change in Profit/Losses across each month
 *  - captures and totals  profit loss change between each month, before finally calc average change.
 *
 *      Records: average change and average change to 2 dec. places.  
 *               Note if financial data only has 1 record then totalChange returned will be 0.
 */ 
function calcAverageProfLossChange() {
    
    var totalChange= 0;
    var averageChange = 0;
    var currChange = 0;
    var secondIdx = 0;

    for(var firstIdx=0; firstIdx<(finances.length-1); firstIdx++) {
        // Compare ProfitLoss between each month 
        secondIdx = firstIdx+1;
    
        //console.log("AverageChange " + finances[secondIdx][PROFIT_LOSS_IDX]+ " - " + finances[firstIdx][PROFIT_LOSS_IDX]);
        currChange = finances[secondIdx][PROFIT_LOSS_IDX] - finances[firstIdx][PROFIT_LOSS_IDX];
        //console.log("currChange = " + currChange);

        totalChange += finances[secondIdx][PROFIT_LOSS_IDX] - finances[firstIdx][PROFIT_LOSS_IDX];
        //console.log("totalChange " + totalChange);
    
    }

    averageChange = totalChange / (totalMonths - 1);
    averageChange2Dp = Math.round(averageChange * 100) / 100;

    //console.log("averageChange = " + averageChange);
    //console.log("averageChange2Dp = " + averageChange2Dp);

}


/*
 *  Builds up report and returns report string
 */
function buildReport() {
    var reportTitle = "Financial Analysis \n" +
                      "---------------------------\n";
    var reportTotalMonths = `Total Months: ${totalMonths} \n`;
    var reportTotal=  `Total: ${CURR_SYMBOL}${total} \n`;
    var reportAverageChange = `Average Change: ${CURR_SYMBOL}${averageChange2Dp} \n`;
    var reportIncreaseProfits = `Greatest Increase in Profits: ${largestProfitIncr[DATE_IDX]}  (${CURR_SYMBOL}${largestProfitIncr[PROFIT_LOSS_IDX]}) \n`;
    var reportDecreaseProfits = `Greatest Decrease in Profits: ${largestProfitDecr[DATE_IDX]}  (${CURR_SYMBOL}${largestProfitDecr[PROFIT_LOSS_IDX]}) \n`;

    var fullReport = reportTitle +
                        reportTotalMonths + 
                        reportTotal +
                        reportAverageChange +
                        reportIncreaseProfits +
                        reportDecreaseProfits;

    return fullReport;
}


 /*
  * Print report - basic report to console only for now.
  */
function printReport(fullReport) {
    console.log(fullReport);
}



/*  MAIN FUNCTION DEFINITION and CALL*/

/*
 *  Main report routine
 *
 */
function main() {

    verifyData();
    performAnalysis();
    printReport(buildReport());

}

main();