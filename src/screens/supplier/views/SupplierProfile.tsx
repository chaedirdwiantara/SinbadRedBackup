/** === IMPORT PACKAGES ===  */
import React, { FC, useState, useReducer, useEffect } from 'react';
import { View, ScrollView, TouchableWithoutFeedback } from 'react-native';
import { SnbText, color, SnbIcon } from 'react-native-sinbad-ui';
/** === IMPORT COMPONENTS ===  */
import { SupplierSection } from './SupplierSection';
import { SupplierSectionItem } from './SupplierSectionItem';
/** === IMPORT STYLE ===  */
import { SupplierStyle } from '../styles';
/** === TYPE === */
interface SupplierProfileProps {
  description: string;
  businessType: string;
  legalEntity: string;
  foundedYear: number;
  employeesTotal: number;
  joinedYear: number;
  taxIdentificationVerified: boolean;
  address: string;
}
/** === COMPONENTS === */
export const SupplierProfile: FC<SupplierProfileProps> = (props) => {
  const [descriptionHeight, setDescriptionHeight] = useState(0);
  const [seeMoreFlag, setSeeMoreFlag] = useState(false);
  const [seenMore, toggleSeenMore] = useReducer((previous) => !previous, false);

  useEffect(() => {
    if (descriptionHeight > 100) {
      setSeeMoreFlag(true);
    }
  }, [descriptionHeight]);

  return (
    <ScrollView>
      <SupplierSection topShadow={false} title="Deskripsi">
        <View
          style={{
            marginBottom: seeMoreFlag ? 16 : 0,
            height: seeMoreFlag && !seenMore ? 100 : 'auto',
          }}
          onLayout={(event) => {
            const sectionHeight = event.nativeEvent.layout.height;
            setDescriptionHeight(sectionHeight);
          }}>
          <SnbText.B3>{props.description}</SnbText.B3>
        </View>
        {seeMoreFlag && (
          <TouchableWithoutFeedback onPress={toggleSeenMore}>
            <View>
              <SnbText.B3 color={color.red50}>
                {seenMore ? 'See Less' : 'See More'}
              </SnbText.B3>
            </View>
          </TouchableWithoutFeedback>
        )}
      </SupplierSection>
      <SupplierSection title="Informasi Perusahaan">
        <SupplierSectionItem name="Jenis Usaha" value={props.businessType} />
        <SupplierSectionItem name="Badan Usaha" value={props.legalEntity} />
        <SupplierSectionItem name="Tahun Berdiri" value={props.foundedYear} />
        <SupplierSectionItem
          name="Jumlah Karyawan"
          value={props.employeesTotal}
        />
        <SupplierSectionItem
          name="Bergabung di Sinbad"
          value={props.joinedYear}
        />
      </SupplierSection>
      <SupplierSection title="Sertifikasi Dokumen">
        <SupplierSectionItem
          name="NPWP"
          value={
            <View
              style={{
                ...SupplierStyle.verificationTag,
                backgroundColor: props.taxIdentificationVerified
                  ? color.green40
                  : color.red50,
              }}>
              <View style={{ marginRight: 8 }}>
                <SnbIcon
                  name={props.taxIdentificationVerified ? 'check' : 'x'}
                  color={color.white}
                  size={16}
                />
              </View>
              <SnbText.C1 color={color.white}>
                {props.taxIdentificationVerified
                  ? 'Terverifikasi'
                  : 'Belum Diverifikasi'}
              </SnbText.C1>
            </View>
          }
        />
      </SupplierSection>
      <SupplierSection title="Alamat">
        <SnbText.B3>{props.address}</SnbText.B3>
      </SupplierSection>
    </ScrollView>
  );
};
