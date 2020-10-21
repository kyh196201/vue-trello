const getSibling = (item, sibling, index, type) => {
    let prev = null;
    let next = null;
    const _length = sibling.length;

    prev =
        index < 1
            ? null
            : {
                  pos: sibling[index - 1].dataset[type + "Pos"] * 1,
              };
    next =
        index === _length - 1
            ? null
            : {
                  pos: sibling[index + 1].dataset[type + "Pos"] * 1,
              };

    return { prev, next };
};

export default getSibling;
