import { Card } from "antd";
import styled from "styled-components";

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img {
        height: 200px;
        width: 200px;
    };
    position: relative;
`

export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 15px;
    line-height: 16px;
    color: rgb(56, 56, 61);
`

export const WrapperReportText = styled.div`
    font-size: 12px;
    color: rgb(128, 128, 137);
    display: flex;
    align-items: center;
    margin: 6px 0 0px;
`

export const WrapperPriceText = styled.div`
    color: rgb(108, 52, 40);
    font-size: 17px;
    font-weight: 500;
`

export const WrapperPriceDiscountText = styled.span`
    color: rgb(186, 112, 79);
    font-size: 13px;
    font-weight: 500;
`