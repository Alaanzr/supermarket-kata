/** @jsx jsx */
import { css, jsx } from '@emotion/core';
import MUITypography from '@material-ui/core/Typography';

const Typography = ({ variant, component, children }) => (
  <div
    css={css`
      margin-bottom: 15px;
    `}
  >
    <MUITypography variant={variant} component={component}>
      {children}
    </MUITypography>
  </div>
);

export default Typography;
