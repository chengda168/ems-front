const type = {
    'status' : {
        0 : '停 用',
        1 : '启 用'
    },
}

export function typeFormatter(row,column) {
    let prop = column.property;
    return type[prop][row[prop]]
}

export default {
    typeFormatter
}