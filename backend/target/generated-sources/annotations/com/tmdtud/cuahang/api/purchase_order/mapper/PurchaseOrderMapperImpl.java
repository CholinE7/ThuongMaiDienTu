package com.tmdtud.cuahang.api.purchase_order.mapper;

import com.tmdtud.cuahang.api.purchase_order.dto.PurchaseOrderDTO;
import com.tmdtud.cuahang.api.purchase_order.model.PurchaseOrders;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.GregorianCalendar;
import javax.annotation.processing.Generated;
import javax.xml.datatype.DatatypeConfigurationException;
import javax.xml.datatype.DatatypeFactory;
import javax.xml.datatype.XMLGregorianCalendar;
import org.springframework.stereotype.Component;

@Generated(
    value = "org.mapstruct.ap.MappingProcessor",
    date = "2026-03-31T23:18:58+0700",
    comments = "version: 1.5.5.Final, compiler: javac, environment: Java 17.0.18 (Microsoft)"
)
@Component
public class PurchaseOrderMapperImpl implements PurchaseOrderMapper {

    private final DatatypeFactory datatypeFactory;

    public PurchaseOrderMapperImpl() {
        try {
            datatypeFactory = DatatypeFactory.newInstance();
        }
        catch ( DatatypeConfigurationException ex ) {
            throw new RuntimeException( ex );
        }
    }

    @Override
    public PurchaseOrderDTO toDTO(PurchaseOrders purchaseOrder) {
        if ( purchaseOrder == null ) {
            return null;
        }

        PurchaseOrderDTO purchaseOrderDTO = new PurchaseOrderDTO();

        purchaseOrderDTO.setId( purchaseOrder.getId() );
        purchaseOrderDTO.setCreated_at( xmlGregorianCalendarToString( dateToXmlGregorianCalendar( purchaseOrder.getCreated_at() ), null ) );
        purchaseOrderDTO.setTotalPrice( purchaseOrder.getTotalPrice() );
        purchaseOrderDTO.setCustomer( purchaseOrder.getCustomer() );
        purchaseOrderDTO.setEmployer( purchaseOrder.getEmployer() );
        purchaseOrderDTO.setMethod( purchaseOrder.getMethod() );

        return purchaseOrderDTO;
    }

    private String xmlGregorianCalendarToString( XMLGregorianCalendar xcal, String dateFormat ) {
        if ( xcal == null ) {
            return null;
        }

        if (dateFormat == null ) {
            return xcal.toString();
        }
        else {
            Date d = xcal.toGregorianCalendar().getTime();
            SimpleDateFormat sdf = new SimpleDateFormat( dateFormat );
            return sdf.format( d );
        }
    }

    private XMLGregorianCalendar dateToXmlGregorianCalendar( Date date ) {
        if ( date == null ) {
            return null;
        }

        GregorianCalendar c = new GregorianCalendar();
        c.setTime( date );
        return datatypeFactory.newXMLGregorianCalendar( c );
    }
}
