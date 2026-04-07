package com.tmdtud.cuahang.api.purchase_order.model;

public enum PurchaseOrderStatus {
    PENDING,
    CANCLED,
    ACCEPTED;

    public boolean canAdvanceTo(PurchaseOrderStatus next){
        return switch (this){
            case PENDING -> next == ACCEPTED;
            default -> false;
        };
    }

    public boolean isCancellable(){
        return this == PENDING;
    }

    public boolean isTerminal() {
        return this == CANCLED || this == ACCEPTED;
    }
}
