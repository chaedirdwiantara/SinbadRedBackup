/** === IMPORT PACKAGES === */
import React, { FC, useState } from 'react';
import { View, Pressable, ScrollView } from 'react-native';
import {
  SnbBottomSheet,
  SnbDatepicker,
  SnbText,
  SnbButton,
  color,
} from 'react-native-sinbad-ui';
/** === IMPORT STYLE === */
import { HistoryModalStyle } from '../styles';
/** === TYPES === */
interface DatePickerModalProps {
  visible: boolean;
  title: string;
  onChange: (data: { date: Date; formatted: string }) => void;
  onClose: () => void;
}

interface DateInputProps {
  title: string;
  ISOStringDate: string;
  onPress: () => void;
}

interface HistoryFilterModalContentProps {
  startDate: string;
  endDate: string;
  onDateChange: (type: 'start' | 'end', value: string) => void;
  onDateReset: () => void;
  onSubmit: () => void;
}

interface IActiveInput {
  title: string;
  type: 'start' | 'end';
}

interface HistoryFilterModalProps extends HistoryFilterModalContentProps {
  visible: boolean;
  onClose: () => void;
}
/** === CONSTANT === */
const Months = {
  0: 'Januari',
  1: 'Februari',
  2: 'Maret',
  3: 'April',
  4: 'Mei',
  5: 'Juni',
  6: 'Juli',
  7: 'Agustus',
  8: 'September',
  9: 'Oktober',
  10: 'November',
  11: 'Desember',
};
/** === COMPONENTS === */
const DatePickerModal: FC<DatePickerModalProps> = ({
  visible,
  title,
  onChange,
  onClose,
}) => (
  <SnbBottomSheet
    open={visible}
    title={title}
    actionIcon="close"
    closeAction={onClose}
    content={
      <ScrollView contentContainerStyle={HistoryModalStyle.datePickerContainer}>
        <SnbDatepicker
          onSelectedDate={(date) => onChange(date)}
          buttonLabel="Terapkan Tanggal"
          maxDate={new Date()}
        />
      </ScrollView>
    }
  />
);

const DateInput: FC<DateInputProps> = ({ title, ISOStringDate, onPress }) => {
  const dateInstance = new Date(ISOStringDate);
  const date = dateInstance.getDate();
  const month = Months[dateInstance.getMonth() as keyof typeof Months];
  const year = dateInstance.getFullYear();

  return (
    <View style={{ flex: 1 }}>
      <View style={{ marginBottom: 8 }}>
        <SnbText.B3>{title}</SnbText.B3>
      </View>
      <Pressable onPress={onPress} style={HistoryModalStyle.dateInputContainer}>
        {!date ? (
          <SnbText.B3 color={color.black60}>DD / MM / YYYY</SnbText.B3>
        ) : (
          <SnbText.B3>{`${date} / ${month} / ${year}`}</SnbText.B3>
        )}
      </Pressable>
    </View>
  );
};

const HistoryFilterModalContent: FC<HistoryFilterModalContentProps> = ({
  startDate,
  endDate,
  onDateChange,
  onDateReset,
  onSubmit,
}) => {
  const [dateModalVisible, setDateModalVisible] = useState(false);
  const [activeInput, setActiveInput] = useState<IActiveInput>({
    title: 'Tanggal Mulai Dari',
    type: 'start',
  });
  const isEmpty = !startDate && !endDate;

  return (
    <View>
      <View style={HistoryModalStyle.filterModalContentContainer}>
        <View style={{ marginTop: -8 }}>
          <SnbButton.Dynamic
            type="tertiary"
            title="Reset"
            size="small"
            position="right"
            onPress={onDateReset}
            disabled={isEmpty}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <DateInput
            title="Mulai Dari"
            onPress={() => {
              setActiveInput({ title: 'Tanggal Mulai Dari', type: 'start' });
              setDateModalVisible(true);
            }}
            ISOStringDate={startDate}
          />
          <View style={{ width: 32 }} />
          <DateInput
            title="Sampai Dengan"
            onPress={() => {
              setActiveInput({ title: 'Tanggal Sampai Dengan', type: 'end' });
              setDateModalVisible(true);
            }}
            ISOStringDate={endDate}
          />
        </View>
      </View>
      <View style={{ marginTop: 32, height: 72 }}>
        <SnbButton.Single
          type="primary"
          title="Terapkan Tanggal"
          onPress={onSubmit}
          disabled={
            // Will be disabled if only one of the date value is empty
            Boolean(startDate && !endDate) || Boolean(!startDate && endDate)
          }
          shadow={true}
          paddingShadow={true}
        />
      </View>
      <DatePickerModal
        visible={dateModalVisible}
        title={activeInput.title}
        onClose={() => setDateModalVisible(false)}
        onChange={(data) => {
          if (activeInput.type === 'start') {
            data.date.setHours(0);
            data.date.setMinutes(0);
            data.date.setSeconds(0);
            onDateChange('start', data.date.toISOString());
          } else {
            onDateChange('end', data.date.toISOString());
          }

          setDateModalVisible(false);
        }}
      />
    </View>
  );
};

export const HistoryFilterModal: FC<HistoryFilterModalProps> = ({
  visible,
  startDate,
  endDate,
  onDateChange,
  onDateReset,
  onSubmit,
  onClose,
}) => {
  return (
    <SnbBottomSheet
      open={visible}
      title="Pilih Tanggal"
      actionIcon="close"
      closeAction={onClose}
      content={
        <HistoryFilterModalContent
          onSubmit={onSubmit}
          startDate={startDate}
          endDate={endDate}
          onDateChange={onDateChange}
          onDateReset={onDateReset}
        />
      }
      isSwipeable={true}
    />
  );
};
