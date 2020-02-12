function list(req, res) {
    if (!req.session.list) {
        req.session.list = [];
    }

    let data = { items: req.session.list };

    res.render('list.hbs', data);
}

function add(req, res) {
    if (!req.session.list) {
        req.session.list = [];
    }

    let list = req.session.list;
    let check = false;
    const item = { name: req.body.item, checked: false };

    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        if (element.name === item.name) {
            console.log("[todo] err: duplicate item name.");
            check = true;
            break;
        }
    }

    if (check == false) {
        console.log(`[todo] Adding "${item}" to database.`);
        list.push(item);
    }

    res.redirect(303, '/todo/list');
}

function save(req, res) {
    if (!req.session.list) {
        req.session.list = [];
    }

    let list = req.session.list;
    const items = req.body.items;
    console.log(`[todo] Saving ID(s) "${items}" state.`);

    for (const i of items) {
        for (const item of list) {
            if (item.name === i) {
                item.checked = true;
                break;
            }
        }
    }

    res.redirect(303, '/todo/list');
}

function remove(req, res) {
    let list = req.session.list;
    const items = req.body.items;
    console.log(`[todo] Removing ID(s) "${items}" from database.`);

    for (const i of items) {
        for (const item of list) {
            if (item.name === i) {
                list.splice(list.indexOf(item), 1);
                break;
            }
        }
    }

    res.redirect(303, '/todo/list');
}

module.exports = { list, add, save, remove };