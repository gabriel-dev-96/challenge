import { Item } from './gilded-rose';

export interface ItemUpdater {
    updateQuality(item: Item): void;
}

export class NormalItemUpdater implements ItemUpdater {
    updateQuality(item: Item): void {
        if (item.quality > 0) {
            item.quality = item.quality - 1;
        }
        
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0 && item.quality > 0) {
            item.quality = item.quality - 1;
        }
    }
}

export class AgedBrieUpdater implements ItemUpdater {
    updateQuality(item: Item): void {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
        }
        
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0 && item.quality < 50) {
            item.quality = item.quality + 1;
        }
    }
}

export class BackstagePassUpdater implements ItemUpdater {
    updateQuality(item: Item): void {
        if (item.quality < 50) {
            item.quality = item.quality + 1;
            
            if (item.sellIn <= 10 && item.quality < 50) {
                item.quality = item.quality + 1;
            }
            
            if (item.sellIn <= 5 && item.quality < 50) {
                item.quality = item.quality + 1;
            }
        }
        
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0) {
            item.quality = 0;
        }
    }
}

export class SulfurasUpdater implements ItemUpdater {
    updateQuality(item: Item): void {
        // Sulfuras nunca cambia
    }
}

export class ConjuredItemUpdater implements ItemUpdater {
    updateQuality(item: Item): void {
        if (item.quality > 0) {
            item.quality = item.quality - 2;
        }
        
        item.sellIn = item.sellIn - 1;

        if (item.sellIn < 0 && item.quality > 0) {
            item.quality = item.quality - 2;
        }

        // Asegurar que la calidad nunca sea negativa
        if (item.quality < 0) {
            item.quality = 0;
        }
    }
}
