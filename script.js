const cardData = [
    {id: 1, title:'danceXL', description:'Electronic', listened: false, background: 'linear-gradient(152.12deg, #474775 3.6%, rgba(94, 94, 211, 0.666667) 29.96%, rgba(85, 158, 244, 0.65) 58.19%, #5042AA 82.7%)'},
    {id: 2, title:'Rap Life', description:'Rap & Hip-Hop', listened: false, background: 'linear-gradient(153.72deg, #FCD400 5.34%, rgba(143, 255, 0, 0.6875) 29.76%, rgba(46, 200, 108, 0.71) 57.43%, #147563 83.47%)'},
    {id: 3, title:'A-List Pop', description:'Pop', listened: false, background: '#0075FF'},
    {id: 4, title:'ALT CTRL', description:'Alternative', listened: false, background: 'linear-gradient(180deg, #9AEEEF 0%, #4A7FD5 100%)'},
    {id: 5, title:'Midnight city', description:'Indie', listened: false, background: 'linear-gradient(103.58deg, #281930 2.95%, rgba(146, 28, 209, 0.69) 30.49%, #7A1CAD 93.22%)'},
    {id: 6, title:'Favela Boys', description:'Pop', listened: true, background: '#4F4FFF'},
    {id: 7, title:'First Two Pages of Frankenstein', listened: true, description:'Electronic', background: '#A5FA62'},
    {id: 8, title:'BOY OH BOY', description:'Rap & Hip-Hop', listened: true, background: '#56F29E'},
    {id: 9, title:'BUMMER', description:'Rap & Hip-Hop', listened: true, background: '#FD996E'},
    {id: 10, title:'Notes On A Conditional Form', listened: true, description:'Alternative', background: '#6ABDEB'}
];

const main = document.getElementById('main');
const searchInput = document.getElementById('searchInput');

function loadMain () {
    main.innerHTML = '';

    const mainTitle = document.createElement('span');
    mainTitle.className = 'mainTitle';
    mainTitle.innerHTML = 'Главная';
    main.appendChild(mainTitle);

    const forYou = document.createElement('div');
    forYou.className = 'forYou';
    forYou.innerHTML = `
        <span class="forYouTitle">Специально для вас</span>
        <div class="forYouCardsContainer" id="forYouCardsContainer"></div>
    `;
    main.appendChild(forYou);

    const listened = document.createElement('div');
    listened.className = 'listened';
    listened.innerHTML = `
        <span class="listenedTitle">Недавно прослушанное</span>
        <div class="listenedCardsContainer" id="listenedCardsContainer"></div>
    `;
    main.appendChild(listened);

    loadForYouCards();
    loadListenedCards();
}

function getForYouCards() {
    const forYouCards = cardData.filter(
        card => card.listened === false
    );
    return forYouCards;
} 

function getListenedCards() {
    const forYouCards = cardData.filter(
        card => card.listened === true
    );
    return forYouCards;
} 

function loadForYouCards () {
    const cardContainer = document.getElementById('forYouCardsContainer');
    cardContainer.innerHTML = '';
    const forYouCards = getForYouCards();
    forYouCards.sort(() => Math.random() - 0.5);
    forYouCards.slice(0, 5);

    for (let i=0; i < 3; i++) {
        const card = forYouCards[i];
        const cardElement = document.createElement('div');
        cardElement.className = 'forYouCard';
        cardElement.innerHTML = `
            <div class="forYouCardContent" style="background: ${card.background}">
                <div class="forYouCardTitle">
                    <span class="forYouCardHeading">${card.title}</span>
                    <span class="forYouCardText">${card.description}</span>
                </div>
                <button class="forYouCardButton"></button>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    }

    const cardElement = document.createElement('div');
    cardElement.className = 'forYouCardGroup';
    cardElement.innerHTML = `
        <div class="forYouSmallCard">
            <div class="forYouSmallCardContent" style="background: ${forYouCards[3].background}">
                <div class="forYouSmallCardTitle">
                    <span class="forYouSmallCardHeading">${forYouCards[3].title}</span>
                    <span class="forYouSmallCardText">${forYouCards[3].description}</span>
                </div>
                <button class="forYouCardButton"></button>
            </div>
        </div>

        <div class="forYouSmallCard">
            <div class="forYouSmallCardContent" style="background: ${forYouCards[4].background}">
                <div class="forYouSmallCardTitle">
                    <span class="forYouSmallCardHeading">${forYouCards[4].title}</span>
                    <span class="forYouSmallCardText">${forYouCards[4].description}</span>
                </div>
                <button class="forYouCardButton"></button>
            </div>
        </div>
    `
    cardContainer.appendChild(cardElement);
}

function loadListenedCards () {
    const cardContainer = document.getElementById('listenedCardsContainer');
    cardContainer.innerHTML = '';
    const listenedCards = getListenedCards();
    listenedCards.sort(() => Math.random() - 0.5);
    listenedCards.slice(0, 5);

    for (let i=0; i < 5; i++) {
        const card = listenedCards[i];
        const cardElement = document.createElement('div');
        cardElement.className = 'listenedCard';
        cardElement.innerHTML = `
            <div class="listenedCard">
                <img class="listenedCardImg" style="background: ${card.background}">
                <span class="listenedCardText">${card.title}</span>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    }
}

searchInput.addEventListener('input', function() {
    const searchTerm = searchInput.value.toLowerCase();
    if (searchTerm) {
        loadFilteredCards(searchTerm);
    } else {
        loadMain();
    }
});

function loadFilteredCards(searchTerm) {
    main.innerHTML = '';

    const mainTitle = document.createElement('span');
    mainTitle.className = 'mainTitle';
    mainTitle.innerHTML = 'Результаты поиска';
    main.appendChild(mainTitle);

    const forYou = document.createElement('div');
    forYou.className = 'forYou';
    forYou.innerHTML = `
        <div class="forYouCardsContainer" id="forYouCardsContainer"></div>
    `;
    main.appendChild(forYou);

    const filteredCards = cardData.filter(card => {
        return card.title.toLowerCase().includes(searchTerm) || 
               card.description.toLowerCase().includes(searchTerm);
    });

    const cardContainer = document.getElementById('forYouCardsContainer');
    cardContainer.innerHTML = '';

    filteredCards.forEach (card => {
        const cardElement = document.createElement('div');
        cardElement.className = 'forYouCard';
        cardElement.innerHTML = `
            <div class="forYouCardContent" style="background: ${card.background}">
                <div class="forYouCardTitle">
                    <span class="forYouCardHeading">${card.title}</span>
                    <span class="forYouCardText">${card.description}</span>
                </div>
                <button class="forYouCardButton"></button>
            </div>
        `;
        cardContainer.appendChild(cardElement);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const loader = document.getElementById('loader');
        loader.style.display = 'none';
        loadMain();
    }, 400);
});



