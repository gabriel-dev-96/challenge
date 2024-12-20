import { expect } from 'chai';
import { Item, GildedRose } from '../app/gilded-rose';

describe('Gilded Rose', () => {
  describe('Items normales', () => {
    it('debe degradar la calidad en 1 antes de la fecha de venta', () => {
      const items = [new Item('item normal', 5, 10)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(9);
      expect(items[0].sellIn).to.equal(4);
    });

    it('debe degradar la calidad en 2 después de la fecha de venta', () => {
      const items = [new Item('item normal', 0, 10)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(8);
      expect(items[0].sellIn).to.equal(-1);
    });

    it('nunca debe tener calidad negativa', () => {
      const items = [new Item('item normal', 5, 0)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Aged Brie', () => {
    it('debe incrementar la calidad con el tiempo', () => {
      const items = [new Item('Aged Brie', 5, 10)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(11);
    });

    it('nunca debe exceder calidad 50', () => {
      const items = [new Item('Aged Brie', 5, 50)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(50);
    });
  });

  describe('Sulfuras', () => {
    it('nunca debe cambiar calidad ni fecha de venta', () => {
      const items = [new Item('Sulfuras, Hand of Ragnaros', 5, 80)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(80);
      expect(items[0].sellIn).to.equal(5);
    });
  });

  describe('Backstage passes', () => {
    it('debe incrementar calidad en 1 cuando faltan más de 10 días', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 11, 20)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(21);
    });

    it('debe incrementar calidad en 2 cuando faltan 10 días o menos', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 10, 20)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(22);
    });

    it('debe incrementar calidad en 3 cuando faltan 5 días o menos', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 5, 20)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(23);
    });

    it('debe poner calidad en 0 después del concierto', () => {
      const items = [new Item('Backstage passes to a TAFKAL80ETC concert', 0, 20)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(0);
    });
  });

  describe('Items Conjured (Nueva funcionalidad)', () => {
    it('debe degradar la calidad dos veces más rápido que los items normales', () => {
      const items = [new Item('Conjured Mana Cake', 5, 10)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(8);
    });

    it('debe degradar la calidad cuatro veces más rápido después de la fecha de venta', () => {
      const items = [new Item('Conjured Mana Cake', 0, 10)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(6);
    });

    it('nunca debe tener calidad negativa', () => {
      const items = [new Item('Conjured Mana Cake', 5, 1)];
      const gildedRose = new GildedRose(items);
      
      gildedRose.updateQuality();
      
      expect(items[0].quality).to.equal(0);
    });
  });
});
