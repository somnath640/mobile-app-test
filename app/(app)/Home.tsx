import React from 'react'
import { Pressable, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import Cards from '../components/Cards'
import ProgressBar from '../components/ProgressBar'
import ScrollCards from '../components/ScrollCards'

const HomeScreen = () => {
  return (
    <ScrollView className='flex-1 p-4'>
      <View className='flex-1 p-4 overflow-auto'>
        <View className='flex-row justify-between'>
          <View className='w-44'>
            <Text className='text-lg'>Dashboard</Text>
          </View>
          <View className='w-44'>
            <Pressable
              className="bg-blue-600 px-4 py-3 rounded-none items-center"
              onPress={() => console.log("Button pressed")}
            >
              <Text className="text-white font-bold text-sm">Mark Attendance</Text>
            </Pressable>
          </View>
        </View>
        <View>
          <Text>Welcome back, demo</Text>
          <Text>Thursday, November 8, 2025</Text>
        </View>
        <View>
          <Cards colorClass="bg-blue-500" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" />
          <Cards colorClass="bg-green-500" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" />
          <Cards colorClass="bg-yellow-500" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" />
          <Cards colorClass="bg-pink-500" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" />
          <Cards colorClass="bg-blue-500" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" />
        </View>
        <View className='mt-4 rounded-md shadow-md bg-white p-4'>
          <View className='flex-row justify-between items-center'>
            <View>
              <Text>Sales Targets</Text>
              <Text>November</Text>
            </View>
            <TouchableOpacity className='bg-transparent'>
              <Text>View Details</Text>
            </TouchableOpacity>
          </View>
          <ProgressBar current={216} total={248} />
          <ProgressBar current={216} total={248} />
          <ProgressBar current={216} total={248} />
          <ProgressBar current={216} total={248} />
        </View>
        <View className='mt-4 rounded-md shadow-md bg-white p-4'>
          <View className='flex-row justify-between items-center'>
            <View>
              <Text>Sales Targets</Text>
              <Text>November</Text>
            </View>
            <TouchableOpacity className='bg-transparent'>
              <Text>View Details</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row gap-4 overflow-auto mt-4'>
            <ScrollView horizontal>
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
              <ScrollCards title="Card 1" description="This is the first card" borderColor="blue" />
            </ScrollView>
          </View>
        </View>
        <View className='mt-4 rounded-md shadow-md bg-white p-4'>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row gap-4'>
              <Text>Pending Follow-ups</Text>
              <Pressable
                className="bg-red-600 rounded-md items-center h-6 w-6"
                onPress={() => console.log("Button pressed")}
              >
                <Text className="text-white font-bold text-sm">4</Text>
              </Pressable>
            </View>
            <TouchableOpacity className='bg-transparent'>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row gap-4 overflow-auto mt-4'>
            <ScrollView>
              <Cards type="followUp" colorClass="bg-red-100" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" textColor='text-black' description="Sample devivary and feedback" address="Bombay Hospital" />
              <Cards type="followUp" colorClass="bg-red-100" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" textColor='text-black' description="Sample devivary and feedback" address="Bombay Hospital" />
              <Cards type="followUp" colorClass="bg-red-100" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" textColor='text-black' description="Sample devivary and feedback" address="Bombay Hospital" />
              <Cards type="followUp" colorClass="bg-red-100" header="12 days remaining" subheader="Leave Request" actionType="Apply leave" textColor='text-black' description="Sample devivary and feedback" address="Bombay Hospital" />
            </ScrollView>

          </View>
        </View>
        <View className='mt-4 rounded-md shadow-md bg-white p-4'>
          <View className='flex-row justify-between items-center'>
            <View className='flex-row gap-4'>
              <Text>Product Updates</Text>
              <Pressable
                className="bg-sky-200 rounded-md items-center h-6 w-6"
                onPress={() => console.log("Button pressed")}
              >
                <Text className="text-white font-bold text-sm">3</Text>
              </Pressable>
            </View>
            <TouchableOpacity className='bg-transparent'>
              <Text>View All</Text>
            </TouchableOpacity>
          </View>
          <View className='flex-row gap-4 overflow-auto mt-4'>
            <ScrollView>
              <Cards type="followUp" colorClass="bg-green-100" header="New Launch: CardioPlus XR" actionType="New Product" textColor='text-black' description="Limited stock remaining." footer="2 days ago" />
              <Cards type="followUp" colorClass="bg-red-100" header="New Launch: CardioPlus XR" actionType="New Product" textColor='text-black' description="Limited stock remaining." footer="2 days ago" />
              <Cards type="followUp" colorClass="bg-blue-100" header="New Launch: CardioPlus XR" actionType="New Product" textColor='text-black' description="Limited stock remaining." footer="2 days ago" />
            </ScrollView>

          </View>
        </View>
        <View className="mt-4 flex-row flex-wrap justify-between">
          {/* Card 1 */}
          <View className="w-[48%] mt-4 rounded-md shadow-md bg-white p-4">
            <Text className="text-base font-semibold">Start Call</Text>
          </View>

          {/* Card 2 */}
          <View className="w-[48%] mt-4 rounded-md shadow-md bg-white p-4">
            <Text className="text-base font-semibold">Add Expense</Text>
          </View>

          {/* Card 3 */}
          <View className="w-[48%] mt-4 rounded-md shadow-md bg-white p-4">
            <Text className="text-base font-semibold">Track Sample</Text>
          </View>

          {/* Card 4 */}
          <View className="w-[48%] mt-4 rounded-md shadow-md bg-white p-4">
            <Text className="text-base font-semibold">View Route</Text>
          </View>
        </View>
        <View>
          <Cards type="topPerformer" colorClass="bg-yellow-100" textColor='black' header='Top Performer' description='You are in top 10% in this month!'></Cards>
        </View>
      </View>
    </ScrollView>
  )
}

export default HomeScreen

const styles = StyleSheet.create({})