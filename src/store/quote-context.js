import React from 'react';

let totalHorses = 0;
let singleStalls = 0;
let doubleStalls = 0;
let boxStalls = 0;
const QuoteContext = React.createContext({
    totalHorses: totalHorses,
    singleStalls: singleStalls,
    doubleStalls: doubleStalls,
    boxStalls: boxStalls,
});
export default QuoteContext;