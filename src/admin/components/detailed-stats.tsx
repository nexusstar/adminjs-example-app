import React from 'react';
import { H5, Text, DrawerContent } from '@adminjs/design-system';
import { ActionHeader, ActionProps } from 'adminjs';

const DetailedStats: React.FC<ActionProps> = (props) => (
  <DrawerContent>
    <ActionHeader {...props} omitActions />
    <H5 mt="xxl">Custom action example</H5>
    <Text>Where you can do whatever you like...</Text>
  </DrawerContent>
);

export default DetailedStats;
