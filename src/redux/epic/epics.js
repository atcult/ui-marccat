/* eslint-disable no-unused-vars */
import { Observable } from 'rxjs';
import { of as of$ } from 'rxjs/observable/of';
import { concat as concat$ } from 'rxjs/observable/concat';
import { ajax } from 'rxjs/observable/dom/ajax';
import { ActionTypes } from '../actions/Actions';
import * as marccatActions from '../actions';
import { ENDPOINT, buildUrl } from '../../utils/Constant';
import { fetchFailure } from '../actions/ActionCreator';

export const searchEpic = (action$, store) =>
  action$.ofType(ActionTypes.SEARCH)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequested(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchSearchEngineRecords(record.docs))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));
export const searchAuthEpic = (action$, store) =>
  action$.ofType(ActionTypes.SEARCH_AUTH)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequested(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=-1&ml=170&q=${d.query}&from=1&to=30&dpo=1`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchSearchAuthEngineRecords(record.docs))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));
// TOBE REMOVED
export const searchDetailEpic = (action$, store) =>
  action$.ofType(ActionTypes.DETAILS)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequestedDetail(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL, `lang=ita&view=${d.recordType}&ml=170&q=an%20${d.query}&from=1&to=1&dpo=1`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchDetailsRecords(record.docs[0].data, d.recordType))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

export const searchAssociatedBibRecords = (action$, store) =>
  action$.ofType(ActionTypes.ASSOCIATED_BIB_REC)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequestedAssociatedBibRecords(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.SEARCH_URL_JSON, `lang=ita&view=1&ml=170&q=${d.query}&from=1&to=10&dpo=1`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchAssociatedBibRecords(record.docs, d.recordType, d.count))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

export const templateViewEpic = (action$, store) =>
  action$.ofType(ActionTypes.VIEW_TEMPLATE)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequestedTemplateView(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.VIEW_TEMPLATE_URL, `code=${d.query}&headerTypeCode=15&lang=ita`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchTemplateView(record.docs))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

export const countDocEpic = (action$, store) =>
  action$.ofType(ActionTypes.COUNT_DOC)
    .switchMap((d) =>
      concat$(
        of$(marccatActions.fetchRequestedCountDoc(true)),
        ajax
          .getJSON(buildUrl(ENDPOINT.DOC_COUNT_URL, `view=1&id=${d.query}`), ENDPOINT.HEADERS)
          .map(record => marccatActions.fetchCountDocRecords(record.docs[0].data))
          .catch(e => of$(marccatActions.fetchFailure(e))),
      ));

export function fetchScanBrowsingRecords(action$) {
  return action$
    .ofType(ActionTypes.SCAN)
    .switchMap((data) => {
      return ajax
        .getJSON(buildUrl(ENDPOINT.BROWSING_FIRST_PAGE, `query=${data.query}&view=1&mainLibrary=170&pageSize=10&lang=eng`), ENDPOINT.HEADERS)
        .map((records) => records.headings);
    })
    .map(records => marccatActions.fetchScanBrowsingRecords(records));
}
