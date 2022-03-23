/*
  В функцию appendToBody передаются 3 параметра:
  tag - имя тега, content - содержимое тега и count - количество вставок.
  Необходимо, чтобы функция осуществила вставку на страницу указанный тег с указанным содержимым указанное число раз.
  Считаем, что всегда передается тег, допускающий вставку текста в качестве своего содержимого (P, DIV, I и пр.).
*/
export function appendToBody(tag, content, count) {
    let result = [];

    for (let i = 0; i < count; i++) {
        let element = document.createElement(tag);
        element.textContent = content;
        result.push(element);
    }

    document.body.append(...result);
}

/*
  Создайте дерево вложенных тегов DIV.
  Каждый узел дерева должен содержать childrenCount узлов.
  Глубина дерева задается параметром level.
  Каждый элемент должен иметь класс вида item_n, где n - глубина вложенности элемента. (Нумерацию ведем с единицы).
  Сформированное дерево верните в качестве результата работы функции.
*/
export function generateTree(childrenCount, level) {
    let tree = document.createElement('div');
    tree.className = `item_${level}`;

    function generateTreeNodes(tree, level) {
        if (level === 1) {
            return tree;
        } else {
            let branch = document.createElement('div');
            branch.className = `item_${level - 1}`;
            let clonedNodes = [];
            for (let i = 0; i < childrenCount; i++) {
                clonedNodes.push(tree.cloneNode(true));
            }
            branch.append(...clonedNodes);
            return generateTreeNodes(branch, level - 1);
        }
    }

    return generateTreeNodes(tree, level);
}

/*
  Используйте функцию для создания дерева тегов DIV из предыдущего задания.
  Создайте дерево с вложенностью 3 и числом элементов в каждом узле 2.
  Далее замените все узлы второго уровня (т.е. имеющие класс item_2) на теги SECTION.
  Остальную структуру дерева сохраните неизменной, включая классы и те элементы,
  которые находились внутри переписанных тегов.
  Сформированное дерево верните в качестве результата работы функции.
*/
export function replaceNodes() {
    let tree = generateTree(2, 3);
    for (let i = 0; i < tree.children.length; i++) {
        if ((tree.children[i].className = 'item_2')) {
            let section = document.createElement('section');
            section.className = 'item_2';
            section.innerHTML = tree.children[i].innerHTML;
            tree.firstElementChild.remove();
            tree.insertAdjacentElement('beforeend', section);
        }
    }
    return tree;
}
