const propNames = new Set(['id', 'className', 'textContent', 'onclick']);

/**
 * Создание элемента со свойствами и вложенными элементами
 * @param name {String} Название HTML тега
 * @param props {Object} Свойства и атрибуты элемента
 * @param children {...Node} Вложенные элементы
 * @returns {HTMLElement}
 */
export function createElement(name, props = {}, ...children) {
  const element = document.createElement(name);

  // Назначение свойств и атрибутов
  for (const name of Object.keys(props)) {
    if (propNames.has(name)) {
      element[name] = props[name];
    } else {
      element.setAttribute(name, props[name]);
    }
  }

  // Вставка вложенных элементов
  for (const child of children) {
    element.append(child);
  }

  return element;
}

// Склонение слова в зависимости от числа
export function numTitle(num) {
	if (num % 10 > 1 && num % 10 < 5 && 
		(+String(num).slice(-2, -1) !== 1)) {
			return 'раза'
	}
	return 'раз';
}

export function getMaxCode(list) {
	let maxCode = 0;
	for (let item of list) {
		if (item.code > maxCode) {
			maxCode = item.code;
		}
	}
	return maxCode;
}