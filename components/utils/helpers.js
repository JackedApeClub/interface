const getTotalList = (stakePrefix, unstakePrefix, catchList) => {
    const totalList = catchList.filter((catchItem, index) => {
        if (catchItem?.input.includes(stakePrefix) || catchItem?.input.includes(unstakePrefix)) {
            console.log(catchItem.input);
            return true;
        }
    });
    return totalList;
}

export {
    getTotalList
}