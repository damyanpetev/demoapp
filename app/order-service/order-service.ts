import { Component, Injectable, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Params} from '@angular/router';
import { Location } from '@angular/common';
import { Order, ORDERS } from "./order";

@Injectable()
export class OrderService {

    getOrders(): Promise<Order[]> {
        let orders = ORDERS.filter(order => order.canceled == false);
        return Promise.resolve(orders);
    }

    _getOrder(id: number): Promise<Order> {
        return Promise.resolve(ORDERS[id]);
    }

    getCanceledOrders(): Promise<Order[]> {
        let canceled = ORDERS.filter(order => order.canceled == true);
        return Promise.resolve(canceled);
    }

    getOrdersAsync(): Promise<Order[]> {
        return new Promise<Order[]>(resolve =>
            setTimeout(resolve, 100))
            .then(() => this.getOrders());
    }

    getOrder(id: number): Promise<Order> {
        return new Promise<Order>(resolve =>
            setTimeout(resolve, 100))
            .then(() => this._getOrder(id));
    }

    setCancel(id: number) {
        this._getOrder(id).then(order => order.canceled = true);
    }

    createOrder(order: Order) {
        order.id = ORDERS.length.toString();
        order.date = new Date().toDateString();
        ORDERS.push(order);
        return Promise.resolve(true);
    }
}
