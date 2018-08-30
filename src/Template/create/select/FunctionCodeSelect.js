/**
 * @format
 * @flow
 */
import * as React from 'react';
import { Row, Col } from '@folio/stripes-components/lib/LayoutGrid';
import Select from '@folio/stripes-components/lib/Select';
import { Observable } from 'rxjs';
import { Field } from 'redux-form';

type FunctionCodeSelectProps = {
    mutator: Object;
    resources: Object;
    translate: (o: Object) => string;
};

export default function FunctionCodeSelect({ translate, ...props }: FunctionCodeSelectProps) {
  const onChangeFunctionCode = (e: any) => {
    const { mutator } = props;
    const { value } = e.target;
    mutator.functionCode.replace(value);
    const source = Observable.fromPromise(mutator.marcAssociated.GET());
    source
      .subscribe(k => handleFieldTemplate(k)); // eslint-disable-line
  };

  const handleFieldTemplate = (k: Object) => {
    const { mutator } = props;
    mutator.validationTag.replace(k);
    mutator.fieldTemplate.GET();
  };

  const functionCodesValues = (props.resources.functionCodes || {}).records || [];
  return (
    <Row>
      <Col xs={6}>
        {props.resources.functionCodes && props.resources.functionCodes.hasLoaded && functionCodesValues.length > 0 &&
        <Field
          label={translate({ id: 'ui-marccat.function.code' })}
          component={Select}
          name="functionCode"
          id="functionCode-id"
          dataOptions={functionCodesValues}
          onChange={onChangeFunctionCode}
        />
        }
      </Col>
    </Row>
  );
}
