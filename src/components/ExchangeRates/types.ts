export interface ControlsBarProps {
  openDialog: boolean
  setOpenDialog: (open: boolean) => void
}

export interface CurrenciesDialogProps {
  open: boolean
  onClose: () => void
}
