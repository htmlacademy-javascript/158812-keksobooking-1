//1. Функция для проверки, является ли строка палиндромом

const checkPalindrome = (str) => str.toLowerCase().split(' ').join('') === str.toLowerCase().split(' ').join('').split('').reverse().join('');

checkPalindrome('Лёша на полке клопа нашёл ');
//console.log(checkPalindrome('Лёша на полке клопа нашёл '));


//2. Функция, которая принимает строку, извлекает содержащиеся в ней цифры от 0 до 9 и возвращает их в виде целого положительного числа.

const extractNumber = (str) => {
  let result = '';

  str = str.toString();

  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i], 10))) {
      result += str[i];
    }
  }

  return +result || NaN;
};

extractNumber('2023 год');
//console.log(extractNumber('2023 год'));

//3. Функция, которая принимает три параметра: исходную строку, минимальную длину и строку с добавочными символами — и возвращает исходную строку, дополненную указанными символами до заданной длины. Символы добавляются в начало строки. Если исходная строка превышает заданную длину, она не должна обрезаться. Если «добивка» слишком длинная, она обрезается с конца

const getPadStart = (text, minLength, characters) => {
  const inputText = text.toString();
  const inputCharacters = characters.toString();

  if(inputText.length < minLength) {
    const outputCharaters = inputCharacters.repeat(minLength - inputText.length);
    return outputCharaters.slice(0, minLength - inputText.length) + inputText;
  }

  return inputText;
};

getPadStart('qwerty', 4, '0');
//console.log(getPadStart('qwerty', 4, '0'));


//4. Функция, возвращающая случайное число с плавающей точкой из переданного диапазона включительно. Будет использоваться для генерации временных географических координат

const generateRandomNumber = (min, max, numberSymbols) => {
  const randomNumber = min + Math.random() * (max - min);
  return randomNumber.toFixed(numberSymbols);
};

generateRandomNumber(1, 10, 2);
//console.log(generateRandomNumber(1, 10, 2));
