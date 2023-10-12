const ID = [];
const Url = [];
const DESCRIPTION = ['Продолжай улыбаться, потому что жизнь — прекрасная вещь и есть еще так много поводов для улыбки.',
  'Хочу увидеть, что произойдет, если я не сдамся.',
  'Лучше начать действовать, совершая ошибки, чем медлить, стремясь к безошибочности.',
  'Не бойся быть не таким, как все, и все захотят быть таким, как ты.',
  'Одна хорошая мысль утром меняет смысл целого дня.',
  'Что бы ни случилось завтра, у нас есть еще сегодня.',
  'Настойчивость окупается сполна. Будь голосом, а не эхом.',
  'Человек на вершине горы не упал туда с неба.',
  'Отсутствие сна — это не проблема. Проблема, когда ты не знаешь, ради чего просыпаешься по утрам.',
  'Мы растем, помогая расти другим.", "Каждое мгновенье жизни — еще одна возможность.',
  'Есть лишь один человек, на которого я могу надеяться ― это я сам. И знаете что? Этот человек ни разу меня не подводил.'];
const COMMENTS = [];
const NAME = ['yansklad', 'sh1zuo', 'bunnyscopper', 'frizitheone', 'pozharsky_dj', 'yan4ik_limon4ik', 'exol1te',
  'inkviziciya_', 'mounta1ngoat', 'hacker_attacking', 'bersayap_bersayap', 'wynisma', 'rezist94', 'ficevapor', 'savchukandreyy',
  'sakurawind', 'de3_jesus'];
const MESSAGE = ['Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];
for(let i = 1; i <= 25; i++){
  ID[i] = i + 1;
  Url[i] = `photos/${i}.jpg`;
}

const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

const createComment = () => {
  for(let j = 0; j < Math.floor(Math.random() * 30); j++){
    const randomMessageIndex = getRandomInteger(0, MESSAGE.length - 1);
    const randomNameIndex = getRandomInteger(0, NAME.length - 1);
    COMMENTS[j] = {
      id: Math.floor(Math.random() * 10000),
      avatar: `img/avatar${Math.floor(Math.random() * 6) + 1}.svg`,
      message: MESSAGE[randomMessageIndex],
      name: NAME[randomNameIndex]
    };
  }
  return COMMENTS;
};

const createObject = () => {
  const randomIdIndex = getRandomInteger(0, ID.length - 1);
  const randomUrlIndex = getRandomInteger(0, Url.length - 1);
  const randomDescriptionIndex = getRandomInteger(0, DESCRIPTION.length - 1);
  const randomLikes = Math.floor(Math.random() * 185) + 15;

  return {
    id: ID[randomIdIndex],
    url: Url[randomUrlIndex],
    description: DESCRIPTION[randomDescriptionIndex],
    likes: randomLikes,
    comments: createComment()
  };
};
const objects = [];
for(let call = 0; call <= 24; call++){
  objects[call] = createObject();
}

