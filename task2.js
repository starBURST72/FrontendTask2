
function task21(arr) {
    const opsCount = {};

    for (let i = 0; i < arr.length; i++) {
        const key = `${arr[i].year}-${arr[i].month}`;
        opsCount[key] = opsCount[key] ? opsCount[key] + 1 : 1;
    }
    const opsCountArray = Object.entries(opsCount);

    opsCountArray.sort((a, b) => b[1] - a[1]);

    const result = opsCountArray.slice(0, 3).map(([key, value]) => {
        const [year, month] = key.split("-");
        return { year: Number(year), month: Number(month), opsCount: value };
    });

    return result;
}

function task22(year, month, arr) {
    let filterMonthAndYear = arr.filter(ops => ops.year === year && ops.month === month);
    let replenishment = filterMonthAndYear.reduce((sum, curr) => curr.type === "replenishment" ? sum + curr.amount : sum , 0);
    let monthWithdrawal = filterMonthAndYear.reduce((sum, curr) => curr.type === "withdrawal" ? sum + curr.amount  : sum , 0);
    let payment = filterMonthAndYear.reduce((sum, curr) => curr.type === "payment" ? sum + curr.amount  : sum , 0);
    let monthBalance = replenishment - monthWithdrawal - payment;
    let withdrawalRate = (monthWithdrawal / replenishment).toFixed(4);
    let rank = withdrawalRate < 0.15 ? "Золотой" : withdrawalRate < 0.3 ? "Серебряный" : "Бронзовый";

    let date = new Date(year, month - 1, 0).toISOString().slice(0, 10);

    return { date, monthBalance, monthWithdrawal, withdrawalRate, rank };
}



function task23(arr) {
    const months = [...new Set(arr.map(item => `${item.year}-${item.month}`))].sort();
    let totalBalance = 0;

    return months.map((month) => {
        const [year, monthNumber] = month.split('-');
        const task22Result = task22(parseInt(year), parseInt(monthNumber), arr);

        if (task22Result !== null) {
            totalBalance += task22Result.monthBalance;

            return {
                ...task22Result,
                totalBalance
            };
        }
    }).filter(Boolean);
}





