export class DashboardModel {
    data: Array<DashboardDataPoint>;
    constructor(obj: DashboardModelData = {} as DashboardModel) {
        const {
            data = null
        } = obj;
        this.data = data;
    }
}
export class DashboardDataPoint {
    consumption: number;
    production: number;
    label: string;
    constructor(obj: DashboardDataPointData = {} as DashboardDataPoint) {
        const {
            consumption = 0,
            production = 0,
            label = null
        } = obj
        this.consumption = consumption;
        this.label = label;
        this.production = production;
    }
}
interface DashboardDataPointData {
    consumption: number;
    production: number;
    label: string;
}
interface DashboardModelData {
    data: Array<DashboardDataPoint>;
}
