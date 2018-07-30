
import Pane from '@folio/stripes-components/lib/Pane';
import Paneset from '@folio/stripes-components/lib/Paneset';
import { connect } from '@folio/stripes-connect';
import React from 'react';
import { Col } from '@folio/stripes-components/lib/LayoutGrid';
import IconButton from '@folio/stripes-components/lib/IconButton';
import PaneMenu from '@folio/stripes-components/lib/PaneMenu';
import PrinterProvider from '../Core/Provider/PrinterProvider';
import S from '../Indexes/style/indexes.css';
import css from '../Search/style/Search.css';
import * as C from '../Utils';

const mainIndexResults = require('../../config/static/main-index-list');
const secondaryIndexResults = require('../../config/static/secondary-index-list');

type IndexListProps = {
  stripes: Object;
};

type IndexListState = {
};
class IndexList extends React.Component<IndexListProps, IndexListState> {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const formatMsg = this.props.stripes.intl.formatMessage;
    const printMenu = (
      <PaneMenu {...this.props}>
        <PrinterProvider
          trigger={() => <IconButton title={formatMsg({ id: 'ui-marccat.indexes.print' })} key="icon-gear" icon="duplicate" className={css.stripes__icon} />}
          content={() => (this.componentRef)}
        />
      </PaneMenu>
    );

    return (
      <Paneset static >
        <Pane
          defaultWidth="fill"
          firstMenu={printMenu}
          paneTitle={formatMsg({
            id: 'ui-marccat.indexes.title',
          })}
          appIcon={{ app: C.META.ICON_TITLE }}
        >
          <div ref={(el) => this.componentRef = el} >
            <Col xs={6} id="main" className={S.CustomDivTableContainer} >
              <h1><b>{formatMsg({ id: 'ui-marccat.indexes.main.title' })}</b></h1>
              {
                mainIndexResults.map((dynamicMainData) => (
                  <table style={{ paddingTop: '20px' }}>
                    <thead>
                      <tr>
                        <th colSpan="2"> <p><h4 className={S.CustomIndexesH2}>{dynamicMainData.title}</h4></p></th>
                      </tr>
                    </thead>
                    {
                      dynamicMainData.descriptions.map((dynamicMainValues) => (
                        <tbody>
                          <tr className={S.CustomIndexTR}>
                            <td colSpan="1"><b>{dynamicMainValues.key}</b></td>
                            <td colSpan="1">{dynamicMainValues.value}</td>
                          </tr>
                        </tbody>
                      ))
                    }
                  </table>
                ))
              }
            </Col>
            <Col xs={6} id="secondary" className={S.CustomDivTableContainer}>
              <h1><b>{formatMsg({ id: 'ui-marccat.indexes.secondary.title' })}</b></h1>
              {
                secondaryIndexResults.map((dynamicSecondaryData) => (
                  <table className={S.CustomTableIndexes}>
                    <thead>
                      <tr>
                        <th colSpan="2"> <p><h4 className={S.CustomIndexesH2}>{dynamicSecondaryData.title}</h4></p></th>
                      </tr>
                    </thead>
                    {
                      dynamicSecondaryData.descriptions.map((dynamicMainValues) => (
                        <tbody>
                          <tr className={S.CustomIndexTR}>
                            <td colSpan="1"><b>{dynamicMainValues.key}</b></td>
                            <td colSpan="1">{dynamicMainValues.value}</td>
                          </tr>
                        </tbody>
                      ))
                    }
                  </table>
                ))
              }
            </Col>
          </div>
        </Pane>
      </Paneset>
    );
  }
}
export default connect(IndexList, C.META.MODULE_NAME);
