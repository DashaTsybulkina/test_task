import { array } from 'yargs'
import json from './folders.json'

class Item {
    name: string
    type: string
    parent: number
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

function addChildren(arr: Array<Item>): Array<Item> {
    console.log(arr)
    let root: Array<Item> = []
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].parent == null) {
            console.log(arr[i])
            root.push(arr[i])
        } else
            for (let j = 0; j < arr.length; j++) {
                if (arr[j].id == arr[i].parent) {
                    arr[j].children.push(arr[i]);
                }
            }
    }

    return root;
}
export const data = addChildren(json.map((obj) => new Item(obj.name, obj.type, obj.parent, obj.id)))
