import {banks} from './banks';
import {screen} from './main';

// function checks if the summ of deposit is enough for a chosen credit amount
function getSuitableBanks (userInfo) {
    let suitableBanks = new Set;
    banks.forEach((bank) => {
        if(userInfo.deposit / userInfo.totalPropertyCost > (bank.depositPercent/100)) {
            suitableBanks.add(bank);
        }
    })
    return suitableBanks;
}

function createBankCard (bank) {
    let template = document.querySelector('.bank').content.cloneNode(true);
    template.querySelector('.bank__logo').src = bank.logo;
    template.querySelector('.bank__title').textContent = bank.name;
    template.querySelector('.bank__deposit--title').textContent = bank.depositPercent + '%';
    template.querySelector('.bank__percentage').textContent = bank.percent + '% годовых';
    return template;
}

export function showBanks (userInfo) {
    let suitableBanks = getSuitableBanks(userInfo);
    if(suitableBanks.size === 0) {
        alert('По вашим данным нет предложений от банков. Попробуйте увеличить первоначальный взнос');
        return;
    } else {
        screen.textContent = "";
        suitableBanks.forEach((bank) => screen.appendChild(createBankCard(bank)))
    }
}