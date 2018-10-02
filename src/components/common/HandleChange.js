import React from 'react';

const HandleChange = (name, value, this_) => {

    const errors = {...this_.state.errors, [name]: ''};
    let size = null,
        vendor = null,
        chipset = null,
        ramType = null,
        coolerHeight = null,
        compatibleSockets = null;

    const socketVChipset = [['1', '2', '6', '8', '9', '10'], ['0', '5', '12'], ['3', '4'], ['11'], ['12']];

    const clearError = (parts) => {
        parts ? parts.forEach(part => errors[part] = '') : null;
        setEnums();
    };

    const setEnums = () => {
        return{
            [`${name.toLowerCase()}Enums`]: {size, vendor, chipset, ramType, coolerHeight, compatibleSockets},
            errors,
            [name]: value,
            what: 'why?'
        };
    };

    const handleErrors = () => {
        errors[name] = 'Item not compatible with selected components!';
        setEnums();
    };

    if (value === null) {
        value = null;
        size = null;
        vendor = null;
        chipset = null;
        ramType = null;
        coolerHeight = null;
        compatibleSockets = null;
        return clearError();
    }

    if (this_.state.parts.find(part => part._id === value)) {

        const part = this_.state.parts.find(part => part._id === value);
        const pc = this_.state;


        switch (part.type) {
            case 'Case':

                size = part.size;
                coolerHeight = part.coolerHeight;

                ((!pc.motherboardEnums ||
                    part.size >= pc.motherboardEnums.size) &&

                    (!pc.coolerEnums ||
                        part.coolerHeight >= pc.coolerEnums.coolerHeight)) ?

                    (clearError(['case', 'motherboard', 'cooler'])) : handleErrors();

                break;

            case 'Motherboard':

                size = part.size;
                chipset = part.chipset;
                vendor = part.vendor;

                ((!pc.caseEnums ||
                    part.size <= pc.caseEnums.size) &&

                    (!pc.cpuEnums ||
                        (pc.cpuEnums.chipset === part.chipset)) &&

                    (!pc.coolerEnums ||
                        socketVChipset[pc.coolerEnums.compatibleSockets].includes(part.chipset)) &&

                    (!pc.cpuEnums ||
                        (pc.cpuEnums.vendor === part.vendor))) ?

                    (clearError(['motherboard', 'cpu', 'case', 'cooler'])) : handleErrors();

                break;

            case 'CPU':

                chipset = part.chipset;
                vendor = part.vendor;

                if (pc.coolerEnums) {
                    console.log('cpu:', socketVChipset[pc.coolerEnums.compatibleSockets], typeof part.chipset);
                    console.log(socketVChipset[pc.coolerEnums.compatibleSockets].includes(part.chipset));
                }


                ((!pc.motherboardEnums ||
                    pc.motherboardEnums.chipset === part.chipset) &&

                    (!pc.coolerEnums ||
                        socketVChipset[pc.coolerEnums.compatibleSockets].includes(part.chipset)) &&

                    (!pc.motherboardEnums ||
                        pc.motherboardEnums.vendor === part.vendor)) ?

                    (clearError(['cpu', 'motherboard', 'cooler'])) : handleErrors();

                break;

            case 'RAM':

                ramType = part.ramType;

                ((part.ramType === 'DDR3' &&

                    (!pc.motherboardEnums ||
                        pc.motherboardEnums.chipset <= 4) &&

                    (!pc.cpuEnums ||
                        pc.cpuEnums.chipset <= 4)) ||

                    (part.ramType === 'DDR4' &&

                        (!pc.motherboardEnums ||
                            pc.motherboardEnums.chipset >= 5) &&

                        (!pc.cpuEnums ||
                            pc.cpuEnums.chipset >= 5))) ?

                    (clearError(['ram', 'motherboard', 'cpu'])) : handleErrors();

                break;

            case 'Cooler':

                coolerHeight = part.coolerHeight;
                compatibleSockets = part.compatibleSockets;

                ((!pc.caseEnums ||
                    part.coolerHeight <= pc.caseEnums.coolerHeight) &&

                    (!pc.motherboardEnums ||
                        socketVChipset[part.compatibleSockets].includes(pc.motherboardEnums.chipset)) &&

                    (!pc.cpuEnums ||
                        socketVChipset[part.compatibleSockets].includes(pc.cpuEnums.chipset))) ?

                    (clearError(['cooler', 'case', 'cpu', 'motherboard'])) : handleErrors();

                break;

            case 'GPU':
                break;
            case 'Storage':
                break;
            case 'PSU':
                break;


            default:
                handleErrors();
        }
    }
    return setEnums();
};

export default HandleChange;