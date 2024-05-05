import React, { ReactElement, useEffect } from 'react';
import Head from 'next/head';
import 'react-toastify/dist/ReactToastify.min.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import dayjs from 'dayjs';
import { useAppDispatch, useAppSelector } from '../../stores/hooks';
import { useRouter } from 'next/router';
import { fetch } from '../../stores/orders/ordersSlice';
import { saveFile } from '../../helpers/fileSaver';
import dataFormatter from '../../helpers/dataFormatter';
import ImageField from '../../components/ImageField';
import LayoutAuthenticated from '../../layouts/Authenticated';
import { getPageTitle } from '../../config';
import SectionTitleLineWithButton from '../../components/SectionTitleLineWithButton';
import SectionMain from '../../components/SectionMain';
import CardBox from '../../components/CardBox';
import BaseButton from '../../components/BaseButton';
import BaseDivider from '../../components/BaseDivider';
import { mdiChartTimelineVariant } from '@mdi/js';
import { SwitchField } from '../../components/SwitchField';
import FormField from '../../components/FormField';

const OrdersView = () => {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { orders } = useAppSelector((state) => state.orders);

  const { id } = router.query;

  function removeLastCharacter(str) {
    console.log(str, `str`);
    return str.slice(0, -1);
  }

  useEffect(() => {
    dispatch(fetch({ id }));
  }, [dispatch, id]);

  return (
    <>
      <Head>
        <title>{getPageTitle('View orders')}</title>
      </Head>
      <SectionMain>
        <SectionTitleLineWithButton
          icon={mdiChartTimelineVariant}
          title={removeLastCharacter('View orders')}
          main
        >
          {''}
        </SectionTitleLineWithButton>
        <CardBox>
          <>
            <p className={'block font-bold mb-2'}>Products</p>
            <CardBox
              className='mb-6 border border-gray-300 rounded overflow-hidden'
              hasTable
            >
              <div className='overflow-x-auto'>
                <table>
                  <thead>
                    <tr>
                      <th>Name</th>

                      <th>Price</th>

                      <th>Condition</th>

                      <th>StockQuantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.products &&
                      Array.isArray(orders.products) &&
                      orders.products.map((item: any) => (
                        <tr
                          key={item.id}
                          onClick={() =>
                            router.push(
                              `/products/products-view/?id=${item.id}`,
                            )
                          }
                        >
                          <td data-label='name'>{item.name}</td>

                          <td data-label='price'>{item.price}</td>

                          <td data-label='condition'>{item.condition}</td>

                          <td data-label='stock_quantity'>
                            {item.stock_quantity}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              {!orders?.products?.length && (
                <div className={'text-center py-4'}>No data</div>
              )}
            </CardBox>
          </>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>User</p>

            <p>{orders?.user?.firstName ?? 'No data'}</p>
          </div>

          <FormField label='OrderDate'>
            {orders.order_date ? (
              <DatePicker
                dateFormat='yyyy-MM-dd hh:mm'
                showTimeSelect
                selected={
                  orders.order_date
                    ? new Date(
                        dayjs(orders.order_date).format('YYYY-MM-DD hh:mm'),
                      )
                    : null
                }
                disabled
              />
            ) : (
              <p>No OrderDate</p>
            )}
          </FormField>

          <div className={'mb-4'}>
            <p className={'block font-bold mb-2'}>Status</p>
            <p>{orders?.status ?? 'No data'}</p>
          </div>

          <BaseDivider />

          <BaseButton
            color='info'
            label='Back'
            onClick={() => router.push('/orders/orders-list')}
          />
        </CardBox>
      </SectionMain>
    </>
  );
};

OrdersView.getLayout = function getLayout(page: ReactElement) {
  return (
    <LayoutAuthenticated permission={'READ_ORDERS'}>{page}</LayoutAuthenticated>
  );
};

export default OrdersView;
