<template>
  <table>
    <thead>
      <tr>
        <th>Worksite name</th>
        <th>Employee name</th>
        <th>Equipment used</th>
        <th>Employee job cost</th>
        <th>Equipment cost</th>
        <th>Total cost</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Alfreds Futterkiste</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Centro comercial Moctezuma</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Alfreds Futterkiste</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Centro comercial Moctezuma</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Alfreds Futterkiste</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Centro comercial Moctezuma</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Alfreds Futterkiste</td>
        <td>Maria Anders</td>
        <td>Alfreds Futterkiste</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
      <tr>
        <td>Centro comercial Moctezuma</td>
        <td>Francisco Chang</td>
        <td>Centro comercial Moctezuma</td>
        <td>111$</td>
        <td>122$</td>
        <td>100$</td>
      </tr>
    </tbody>
    <tfoot>
      <tr>
        <td colspan="3"><b>Total</b></td>
        <td>1000$</td>
        <td>1000$</td>
        <td>1000$</td>
      </tr>
    </tfoot>
  </table>
</template>

<style lang="scss" scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th {
  background-color: var(--color-deactivated);
}
td {
  background-color: var(--color-form);
}
table,
th,
td {
  border: 1px solid black;
  padding: 5px;
}
</style>
