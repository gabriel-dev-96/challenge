export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
}

import {
    ItemUpdater,
    NormalItemUpdater,
    AgedBrieUpdater,
    BackstagePassUpdater,
    SulfurasUpdater,
    ConjuredItemUpdater
} from './item-updater';

export class GildedRose {
    items: Array<Item>;
    private updaters: { [key: string]: ItemUpdater } = {};

    constructor(items = [] as Array<Item>) {
        this.items = items;
        this.initializeUpdaters();
    }

    private initializeUpdaters() {
        this.updaters = {
            'normal': new NormalItemUpdater(),
            'Aged Brie': new AgedBrieUpdater(),
            'Backstage passes to a TAFKAL80ETC concert': new BackstagePassUpdater(),
            'Sulfuras, Hand of Ragnaros': new SulfurasUpdater(),
            'Conjured': new ConjuredItemUpdater()
        };
    }

    private getUpdater(item: Item): ItemUpdater {
        if (item.name.startsWith('Conjured')) {
            return this.updaters['Conjured'];
        }
        return this.updaters[item.name] || this.updaters['normal'];
    }

    updateQuality() {
        for (const item of this.items) {
            const updater = this.getUpdater(item);
            updater.updateQuality(item);
        }
        return this.items;
    }
}
