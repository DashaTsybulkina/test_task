import { array } from 'yargs'
import json from './folders.json'

class Item {
    name: string
    type: string
    parent: string
    id: number
    children: Array<Item>

    constructor(nameItem, type, parent, id) {
        this.name = nameItem;
        this.type = type;
        this.parent = parent;
        this.id = id;
        this.children = [];
    }
}

function parse() {
    var jsonData: Array<Item> = []
    if (json[0].name == "root")
        jsonData.push(new Item(json[0].name, "folder", null, 0))
    for (var i = 1; i < json.length; i++) {
        if (json[i].name.indexOf("in") === -1) {
            jsonData.push(new Item(json[i].name, json[i].name.indexOf("folder") == 0 ? "folder" : "file", "root", i));
        } else {
            var indexIn = json[i].name.indexOf("in")
            console.log(indexIn)
            jsonData.push(new Item(json[i].name.substring(0, indexIn - 1), json[i].name.indexOf("folder") < indexIn ? "folder" : "file", json[i].name.substring(indexIn + 3), i));
        }
    }
    jsonData = addChildren(jsonData);
    return jsonData
}

function addChildren(arr: Array<Item>): Array<Item> {
    let root: Array<Item> = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent == null) {
            root.push(arr[i])
        } else
            for (let j = 0; j < arr.length; j++) {
                if (arr[j].name == arr[i].parent) {
                    arr[j].children.push(arr[i]);
                }
            }
    }

    return root;
}

export const data = parse()
