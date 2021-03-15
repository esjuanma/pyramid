export const parseUserInput = (input) => {
    return input.trim().split('\n').map(row => row.trim().split(' ').map(n => +n));
}

const getValue = (top) => {
    return top[0][0];
};

const copy = (pyramid) => {
    return JSON.parse(JSON.stringify(pyramid));
};

const splitPyramid = (pyramid) => {
    const p1 = copy(pyramid);
    const p2 = copy(pyramid);

    p1.shift();
    p1.map(row => row.pop());

    p2.shift();
    p2.map(row => row.shift());

    return [p1, p2];
};

const getMin = (pyramid) => {
    const top = getValue(pyramid.slice(0, 1));

    if (pyramid.length === 1) {
        return {
            min: top,
            path: []
        };
    }

    const [p1, p2] = splitPyramid(pyramid);

    if (p1.length === 1) {
        const [left, right] = [getValue(p1), getValue(p2)];
        return {
            min: top + Math.min(left, right),
            path: [left < right ? 'left' : 'right']
        };
    } else {
        const [left, right] = [getMin(p1), getMin(p2)];
        return {
            min: top + Math.min(left.min, right.min),
            path: left.min < right.min
                ? ['left', ...left.path]
                : ['right', ...right.path]
        };
    }
};

const getMax = (pyramid) => {

};

export const getFastest = (userInput) => {
    const input = parseUserInput(userInput);
    return {
        ...getMin(input),
        input
    };
};

export const getSlowest = (userInput) => {
    return getMax(parseUserInput(userInput));
};