import numpy as np

input = (input("Enter 9 numbers seprated by spaces: "))

ar1 = np.array(input.split(), dtype=float)

if len(ar1) != 9:
      raise ValueError("List must contain nine numbers.")

ar = ar1.reshape(3, 3)


def calculate():

      print("Mean:", [np.mean(ar, axis=0).tolist()],
            [np.mean(ar, axis=1).tolist()], [float(np.mean(ar))])

      print("Median: ", [np.median(ar, axis=0).tolist()],
            [np.median(ar, axis=1).tolist()], [float(np.median(ar))])

      print("Standard Deviation: ", [np.std(ar, axis=0).tolist()],
            [np.std(ar, axis=1).tolist()], [float(np.std(ar))])

      print("Variance: ", [np.var(ar, axis=0).tolist()],
            [np.var(ar, axis=1).tolist()], [float(np.var(ar))])

      print("Maximum: ", [np.max(ar, axis=0).tolist()],
            [np.max(ar, axis=1).tolist()], [float(np.max(ar))])

      print("Minimum: ", [np.min(ar, axis=0).tolist()],
            [np.min(ar, axis=1).tolist()], [float(np.min(ar))])

      print("Sum: ", [np.sum(ar, axis=0).tolist()],
            [np.sum(ar, axis=1).tolist()], [float(np.sum(ar, ))])


calculate()
