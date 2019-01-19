const express = require('express');
const app = express();
const fs = require('fs');

function isDivisibleBy4(numeber) {
    return (numeber >> 3)
}
app.get('/game/:numeber', (req, res) => {
    const totoalCount = req.params.numeber;
    let countPerLine = 1;
    let result = "";
    for (let count = 1; count <= totoalCount; count++) {
        let isSameLine = true;
        if (countPerLine == 1000) {
            isSameLine = false;
            countPerLine = 1;
        } else {
            countPerLine++;
        }
        if (count % 4 == 0 && count % 7 == 0) {
            result = `${result}${result[result.length - 1] == `\n` ? '' : ','}marcopolo${isSameLine ? '' : `\n`}`;
        } else if (count % 4 == 0) {
            result = `${result}${result[result.length - 1] == `\n` ? '' : ','}marco${isSameLine ? '' : `\n`}`;
        } else if (count % 7 == 0) {
            result = `${result}${result[result.length - 1] == `\n` ? '' : ','}polo${isSameLine ? '' : `\n`}`;
        } else {
            result = `${result}${result[result.length - 1] == `\n` ? '' : ','}${count}${isSameLine ? '' : `\n`}`;
        }
    }
    console.log('result====', result);
    fs.writeFile('result.txt', result, (err) => {
        if (err) {
            res.json({
                error: true,
                data: 'There is an error in writing the file.'
            })
        } else {
            res.json({
                success: true,
                data: 'Data parsed and saved successfully.'
            });
        }
    })
    
});

app.listen(3000, function () {
    console.log('server start on 3000 port');
});