const createIncidentFlow = () => {
    let lastIncidentIndex: number = -1;

    return {
        Incident: class {
            private _index: number;

            constructor() {
                this._index = ++lastIncidentIndex;
            }

            get isLatest(): boolean {
                return this._index === lastIncidentIndex;
            }
        },
        expireLatestIncident() {
            lastIncidentIndex++;
        },
    };
};

export { createIncidentFlow };
