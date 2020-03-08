import {Component, OnInit} from '@angular/core';
import {StatsHolder} from './model/StatsHolder';
import {StatsType} from './model/GtoEnums';
import {StatsResult} from './model/StatsResult';

@Component({
    selector: 'app-gto-calculator',
    templateUrl: './gto-calculator.page.html',
    styleUrls: ['./gto-calculator.page.scss'],
})
export class GtoCalculatorPage implements OnInit {
    private static DEFAULT_RANGE_VALUE = 133;
    private nrOfHands = GtoCalculatorPage.DEFAULT_RANGE_VALUE;
    private minRangeValue = 1;
    private maxRangeValue = 1326;
    // shadow StatsType enum as instance member
    private StatsType = StatsType;
    private betValue: number;
    private potValue: number;
    private stackValue: number;
    private equityValueInput: number;
    private equityValue: number;

    private statsResult: StatsResult;
    private currSelectedStatsType: StatsType;
    private currencySymbol = '€';

    constructor() {
    }

    ngOnInit() {
    }

    calcCurrHandsPercent() {
        return Math.round((this.nrOfHands / 13.26) * 10) / 10;
    }

    getResultForStatsType(statsType: StatsType, stats: StatsHolder): StatsResult {
        let resultText;
        let resultTextAdditional;
        if (statsType === StatsType.FEQ) {
            resultText = `Required Fold Equity: ${stats.statsValuePercentage}%`;
            resultTextAdditional = `To make this Bet +EV Villain has to fold at least ${stats.modHands} combos/${stats.modPercent}%`;
        } else if (statsType === StatsType.IMO) {
            resultText = `Required win is ${stats.statsValue}${this.currencySymbol}`;
            // tslint:disable-next-line:max-line-length
            resultTextAdditional = `To make this call +EV you have to win at least ${stats.statsValue}${this.currencySymbol} or more on later streets`;
        } else if (statsType === StatsType.BVR) {
            resultText = `You should bluff: ${stats.statsValuePercentage}%`;
            // tslint:disable-next-line:max-line-length
            resultTextAdditional = `To make Villain indifferent to calling, you need to bluff ${stats.modHands} combos/${stats.modPercent}%`;
        } else if (statsType === StatsType.MDF) {
            resultText = `Your Minimum Defense Frequency should be: ${stats.statsValuePercentage}%`;
            resultTextAdditional = `To make Villain indifferent you have to call ${stats.modHands} combos/${stats.modPercent}%`;
        }
        return {resultText, resultTextAdditional, stats};
    }

    onCalcStats(statsType: StatsType) {
        this.currSelectedStatsType = statsType;
        const stats = this.calcStats(statsType);
        this.statsResult = this.getResultForStatsType(statsType, stats);
    }

    onRangeSlide() {
        if (typeof (this.currSelectedStatsType) === 'undefined') {
            return;
        }
        this.onCalcStats(this.currSelectedStatsType);
    }

    private calcBv() {
        return this.betValue / (this.potValue + 2 * this.betValue);
    }

    private calcFe() {
        const e = this.equityValue;
        const p = this.potValue;
        const s = this.stackValue;
        return (e * (p + 2 * s) - s) / (e * (p + 2 * s) - s - p);
    }

    private calcImo() {
        const b = this.betValue;
        const p = this.potValue;
        const e = this.equityValue;
        return (b - ((p + 2 * b) * e)) / e;
    }

    private calcMdf() {
        return this.potValue / (this.potValue + this.betValue);
    }

    private calcStats(statsType: StatsType): StatsHolder {
        this.equityValue = this.equityValueInput / 100;
        let statsHolder: any;
        if (statsType === StatsType.BVR) {
            statsHolder = this.createStatsHolder(this.calcBv());
        } else if (statsType === StatsType.IMO) {
            statsHolder = this.createStatsHolder(this.calcImo(), false);
        } else if (statsType === StatsType.MDF) {
            statsHolder = this.createStatsHolder(this.calcMdf());
        } else {
            statsHolder = this.createStatsHolder(this.calcFe());
        }
        return statsHolder;
    }

    private createStatsHolder(statsValue: number, includePercentageValue = true) {
        const modHands = Math.round(this.nrOfHands * statsValue);
        const modPercent = Math.round((this.nrOfHands / 13.26 * statsValue) * 10) / 10;
        const statsHolder: StatsHolder = {modHands, modPercent, statsValue};
        const statsValuePercentage = Math.round(statsValue * 1000) / 10;
        if (includePercentageValue) {
            statsHolder.statsValuePercentage = statsValuePercentage;
        }
        return statsHolder;
    }

    onRangeClick(decrease = false) {
        const d = decrease ? -1 : 1;
        this.nrOfHands += d;
    }
}
