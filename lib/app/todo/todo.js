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
    const item = req.body.item;

    list.push({ name: item });

    res.redirect(303, '/todo/list');
}

function save(req, res) {
    if (!req.session.list) {
        req.session.list = [];
    }

    let list = req.session.list;
    const items = req.body;

    for (let i = 0; i < list.length; i++) {
        list[i].done = false; // set all to false
        if (items['item' + i]) {
            console.log(`[todo] Updating ID "${list[i].name}"`);
            list[i].done = "done";
        }
    }

    res.redirect(303, '/todo/list');
}

function remove(req, res) {
    let list = req.session.list;
    const items = req.body;
    let toBeRemoved = [];

    for (let i = 0; i < list.length; i++) {
        const element = items['item' + i];
        if (element === "done") {
            toBeRemoved.push(list[i]);
        }
    }

    for (const i of toBeRemoved) {
        console.log(`[todo] Removing ID "${i.name}"`);
        list.splice(list.indexOf(i), 1);
    }

    res.redirect(303, '/todo/list');
}

module.exports = { list, add, save, remove };