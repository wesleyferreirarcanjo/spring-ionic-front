import { Injectable } from "@angular/core";
import { STORAGE_KEYS } from "../config/storage_keys.config";
import { LocalUser } from "../models/local_user";
import {Storage} from "@ionic/storage"
import { Cart } from "../models/cart.dto";

@Injectable()
export class StorageService {


    constructor(private storage: Storage) {

    }

    getLocalUser() : LocalUser{
        let usr = localStorage.getItem(STORAGE_KEYS.localUser);
        if(usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setLocalUser(obj: LocalUser) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.localUser);
        } else {
            localStorage.setItem(STORAGE_KEYS.localUser, JSON.stringify(obj));
        }
    }

    getCart() : Cart{
        let usr = localStorage.getItem(STORAGE_KEYS.cart);
        if(usr == null) {
            return null;
        } else {
            return JSON.parse(usr);
        }
    }

    setCart(obj: Cart) {
        if(obj == null) {
            localStorage.removeItem(STORAGE_KEYS.cart);
        } else {
            localStorage.setItem(STORAGE_KEYS.cart, JSON.stringify(obj));
        }
    }

    checkIfIsFirstTime()  {
        return this.storage.get('first_time')
    }

    saveFirstTime() {
        this.storage.set(STORAGE_KEYS.firstAccess, "true");
    }

}