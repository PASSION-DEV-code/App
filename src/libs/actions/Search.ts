import Onyx from 'react-native-onyx';
import type {OnyxUpdate} from 'react-native-onyx';
import * as API from '@libs/API';
import type {SearchParams} from '@libs/API/parameters';
import {READ_COMMANDS} from '@libs/API/types';
import ONYXKEYS from '@src/ONYXKEYS';
import * as ReportUtils from '@libs/ReportUtils';
import * as ReportActions from './Report';

function search({hash, query, policyIDs, offset, sortBy, sortOrder}: SearchParams) {
    const optimisticData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.SNAPSHOT}${hash}`,
            value: {
                search: {
                    isLoading: true,
                },
            },
        },
    ];

    const finallyData: OnyxUpdate[] = [
        {
            onyxMethod: Onyx.METHOD.MERGE,
            key: `${ONYXKEYS.COLLECTION.SNAPSHOT}${hash}`,
            value: {
                search: {
                    isLoading: false,
                },
            },
        },
    ];

    API.read(READ_COMMANDS.SEARCH, {hash, query, offset, policyIDs, sortBy, sortOrder}, {optimisticData, finallyData});
}

function createTransactionThread(hash: number, transactionID: string, reportID: string, moneyRequestReportActionID: string) {
    ReportActions.openReport(reportID, '', ['cc2@cc.com'], {}, moneyRequestReportActionID);

    Onyx.merge();
}

export {
    search,
    createTransactionThread,
};
